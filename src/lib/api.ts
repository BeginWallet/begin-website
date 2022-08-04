import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import React from 'react'

const postsDirectory = join(process.cwd(), '_posts')
const guidesDirectory = join(process.cwd(), '_guides')


let Posts: any[]  = [];

type Items = {
  [key: string]: string
}

export function getPostSlugs(dir) {
  let fullPath = ''
  if (!dir)  fullPath = postsDirectory
  else fullPath = postsDirectory +'/'+ dir
  if(fs.statSync(fullPath).isFile()) return Posts.push(dir);
  fs.readdirSync(fullPath).forEach(file => {
    const absolute = join(dir, file);
    console.log(absolute)
    if (fs.statSync(fullPath).isDirectory()) return getPostSlugs(absolute);
    else return Posts.push(absolute);
  });
}

export function getPostBySlug(slug: string[], fields: string[] = []) {
  let realSlug = slug.toString().replace(/,/g, '/').replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  Posts = []
  getPostSlugs('')
  const slugs = Posts
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  console.log(posts)
  
  return posts
}

export function getPosts(fields: string[] = []) {
  Posts = []
  getPostSlugs('')
  const slugs = Posts
  const allPosts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  
  const posts = {
    hero: {},
    stories: {}
  }

  posts.hero = allPosts.filter((post) => (Boolean(post.hero) === true)).shift() || {}
  posts.stories = allPosts.filter((post) => (Boolean(post.hero) === false)) || []

  return posts
}

//GUIDES
export function getGuideSlugs(dir) {
  let fullPath = ''
  if (!dir)  fullPath = guidesDirectory
  else fullPath = guidesDirectory +'/'+ dir
  if(fs.statSync(fullPath).isFile()) return Posts.push(dir);
  fs.readdirSync(fullPath).forEach(file => {
    const absolute = join(dir, file);
    console.log(absolute)
    if (fs.statSync(fullPath).isDirectory()) return getGuideSlugs(absolute);
    else return Posts.push(absolute);
  });
}

export function getGuideBySlug(slug: string[], fields: string[] = []) {
  let realSlug = slug.toString().replace(/,/g, '/').replace(/\.md$/, '')
  const fullPath = join(guidesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllGuides(fields: string[] = []) {
  Posts = []
  getGuideSlugs('')
  const slugs = Posts
  const posts = slugs
    .map((slug) => getGuideBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  console.log(posts)
  
  return posts
}

export function getGuides(fields: string[] = []) {
  Posts = []
  getGuideSlugs('')
  const slugs = Posts
  const allPosts = slugs
    .map((slug) => getGuideBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  
  const posts = {
    hero: {},
    stories: {}
  }

  posts.hero = allPosts.filter((post) => (Boolean(post.hero) === true)).shift() || {}
  posts.stories = allPosts.filter((post) => (Boolean(post.hero) === false)) || []

  return posts
}


//Price API
export async function getADAPrice() {
  const url = 'https://api.binance.com/api/v3/avgPrice?symbol=BTCBUSD'
  const response = await fetch(url)
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

  return response
}
