import React, { useState, useEffect } from 'react';
import css from "./css/Content.module.css";
import { savedPosts } from "../posts.json";
import PostItem from "./PostItem";
import Loader from './Loader';

function ContentHooks() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [fetchedPosts, setFetchedPosts] = useState([]);

    useEffect(() => {
        setInterval(() => {
            setIsLoaded(true);
            setFetchedPosts(savedPosts);
        }, 2000)
    }, []);

    const handleChange = (e) => {
        const name = e.target.value.toLowerCase();
        const filteredPosts = savedPosts.filter((post) => {
            return post.name.toLowerCase().includes(name);
        })
        setFetchedPosts(filteredPosts)
    }

  return (
    <div className={css.Content}>

      <div className={css.TitleBar}>
        <h1>My Photos</h1>
        <form>
          <label htmlFor='searchinput'>Search</label>
          <input
            type='search'
            id='searchinput'
            placeholder='By Author'
            onChange={(e) => handleChange(e)}
          />
          <h4>posts found: {fetchedPosts.length}</h4>
        </form>
      </div>
      <div className={css.SearchResults}>
        {/* part-1 Creating the map function */}
        {/* {
          savedPosts.map((post) => {
              return (
              <div className={css.SearchItem} key={post.title}>
              <p>{post.title}</p>
              <p>{post.name}</p>
              <img src={post.image} alt="random"/>
              <p>{post.description}</p>
              </div>
              )
          })
          } */}

        {/* Part 2: Creating a child component */}
        {
          isLoaded ?
            <PostItem savedPosts={fetchedPosts} />
            : <Loader />
        }
      </div>
    </div>
  )
}

export default ContentHooks