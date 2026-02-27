import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNews, NewsResponse, FetchNewsOptions } from '@/services/terminal/news';

const NEWS_STALE_TIME = 2 * 60 * 1000; // 2 minutes
const NEWS_REFETCH_INTERVAL = 2 * 60 * 1000; // 2 minutes

interface UseNewsOptions {
  chain?: string;
  category?: string;
  enabled?: boolean;
}

export function useNews(options: UseNewsOptions = {}) {
  const { chain, category, enabled = true } = options;

  return useInfiniteQuery<NewsResponse, Error>({
    queryKey: ['news', chain, category],
    queryFn: ({ pageParam }) =>
      fetchNews({
        chain,
        category,
        cursor: pageParam as string | null,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: NEWS_STALE_TIME,
    refetchInterval: NEWS_REFETCH_INTERVAL,
    refetchIntervalInBackground: false,
    enabled,
  });
}
