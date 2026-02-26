'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNews } from '@/hooks/terminal/useNews';
import { NewsFilters } from './NewsFilters';
import type { NewsItem } from '@/services/terminal/news';

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return '0m';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function SentimentDot({ sentiment }: { sentiment: NewsItem['sentiment'] }) {
  const colors = {
    positive: 'bg-[#00FF88]',
    negative: 'bg-[#FF4444]',
    neutral: 'bg-[#666]',
  };

  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full ${colors[sentiment]}`}
      title={sentiment}
    />
  );
}

function SourceBadge({ source }: { source: string }) {
  const shortSource = source.length > 12 ? source.slice(0, 12) + '…' : source;
  return (
    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-[#252525] text-[#666] rounded-sm whitespace-nowrap">
      {shortSource}
    </span>
  );
}

function NewsRow({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-2 px-2 py-1.5 border-b border-[#252525] hover:bg-[#222] transition-colors duration-100 cursor-pointer group"
    >
      <span className="font-mono text-[10px] text-[#555] w-8 flex-shrink-0 pt-0.5">
        {formatTimeAgo(item.publishedAt)}
      </span>
      <span className="flex-1 text-xs text-[#ccc] leading-tight group-hover:text-white line-clamp-2">
        {item.title}
      </span>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <SourceBadge source={item.source} />
        <SentimentDot sentiment={item.sentiment} />
      </div>
    </a>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-start gap-2 px-2 py-1.5 border-b border-[#252525] animate-pulse">
      <div className="w-8 h-3 bg-[#252525] rounded" />
      <div className="flex-1 space-y-1">
        <div className="h-3 bg-[#252525] rounded w-full" />
        <div className="h-3 bg-[#252525] rounded w-3/4" />
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-12 h-4 bg-[#252525] rounded" />
        <div className="w-1.5 h-1.5 bg-[#252525] rounded-full" />
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </>
  );
}

export function NewsFeed() {
  const [activeChain, setActiveChain] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    dataUpdatedAt,
  } = useNews({
    chain: activeChain,
    category: activeCategory,
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  const allItems = data?.pages.flatMap((page) => page.items) ?? [];

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '--:--';

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] border border-[#333] rounded overflow-hidden">
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-[#333] bg-[#1a1a1a]">
        <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-wider">
          News Feed
        </span>
        <span className="font-mono text-[10px] text-[#555]">
          UPD {lastUpdated}
        </span>
      </div>

      <NewsFilters
        activeChain={activeChain}
        activeCategory={activeCategory}
        onChainChange={setActiveChain}
        onCategoryChange={setActiveCategory}
      />

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
        {error ? (
          <div className="flex items-center justify-center h-32 text-xs text-[#FF4444] font-mono">
            Error loading news
          </div>
        ) : isLoading ? (
          <LoadingSkeleton />
        ) : allItems.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-xs text-[#555] font-mono">
            No news found
          </div>
        ) : (
          <>
            {allItems.map((item) => (
              <NewsRow key={item.id} item={item} />
            ))}
            <div ref={loadMoreRef} className="h-1" />
            {isFetchingNextPage && (
              <div className="py-2">
                <SkeletonRow />
                <SkeletonRow />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
