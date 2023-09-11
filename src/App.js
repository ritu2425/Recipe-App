
import './App.css';
import React, { useEffect, useState } from "react";
import Recipe from './recipe';

const App=()=>{
 
  const AppId="b3b0a50c";
  const AppKey="e6c914e4a164559991acdbe59739eaaf"
  
  const[recipes,setRecipes]=useState([]);
  const[search,setSearch]=useState("");
  const[query,setQuery]=useState("chicken");

 useEffect(()=>{
  // console.log("effect has been run")
  getRecipe();
 },
 [query]
 );
 const getRecipe=async()=>{
  const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${AppId}&app_key=${AppKey}`);
  const data= await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
 };
 const updateSearch=e=>{
  setSearch(e.target.value);
  // console.log(search);
 };
 const getSearch=e =>{
  e.preventDefault();
  setQuery(search);
  setSearch("");
 };


  return(
    <div className='App'>
      <form onSubmit={getSearch} className='searchform'>
        <input className='searchbar' type='text' 
        value={search} onChange={updateSearch}
        />
        <button  className='searchbutton' type='submit'>search</button>

      </form>
      <div className='recipes'>
      {recipes.map(recipe=>(
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
    </div>
  );
};

export default App;
