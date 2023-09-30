'use client'
import Image from 'next/image'
import styles from '../modulestyle/meals.module.css'
import cn from "classnames";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react';
config.autoAddCss = false

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axios from 'axios'

const fetcher = (url, data) => {
    return axios.get(url, data).then(res => res.data);
};

export default function Home() {

    var [addedRecipes, setAddedRecipes] = useState({})

    const recipeRef = useRef();
    const loadRef = useRef();

    const [recipes, setRecipes] = useState([]);
    const [recipeInput, setRecipeInput] = useState('');
    const [nextLink, setNextLink] = useState("")
    const [lastInput, setLastInput] = useState("")

    const [diet, setDiet] = useState("balanced")

    const [recipeListClass, setRecipeListClass] = useState(cn(styles.recipes_list))
    const [headerClass, setHeaderClass] = useState(cn(styles.meals_header, styles.meals_header_contain_view))

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setRecipeListClass(cn(styles.recipes_list))
                setHeaderClass(cn(styles.meals_header))
            }
            else {
                setRecipeListClass(cn(styles.recipes_list, styles.recipes_list_full_view))
                setHeaderClass(cn(styles.meals_header, styles.meals_header_contain_view))
            }
        });
        observer.observe(recipeRef.current);
    }, []);

    useEffect(() => {

        async function init() {
            const meals = await fetcher(`/api/meals?input=protein%20meals&diet=high-protein`, false)
            setRecipes([meals.hits]);
            if (meals._links.next) {
                setNextLink(meals._links.next.href)
            }
            else setNextLink(false)

            const getAddedRecipes = await fetcher(`/api/getRecipes?id=64f5ac47bd5c45df8ab214d9`, false)
            
            getAddedRecipes.recipes.forEach(recipe => setAddedRecipes(addedRecipes => ({...addedRecipes, [recipe.url]: true })))
        }

        init()
        return () => { }
    }, [])

    const loadMore = async () => {
        if (lastInput && nextLink) {

            const meals = await fetcher(`/api/nextPage?url=${nextLink}&input=${lastInput}`, false)
            setRecipes(oldArr => [...oldArr, meals.hits]);
            if (meals._links.next) setNextLink(meals._links.next.href)
            else setNextLink(false)
        }
    }

    const handleChange = (e) => {
        setDiet(e.target.value);
    };

    return (
        <main className={styles.main}>
            <div className={styles.navbar}>
                <a className={styles.logo_container} href='./'>
                    <img src="data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7"></img>
                    BULKINATOR
                </a>
                <div className={styles.auth_container}>
                    <a className={styles.login} href="./login">
                        Login
                    </a>
                    <a className={styles.register} href="./register">
                        Register
                    </a>
                </div>
            </div>

            <div className={styles.meals_background}></div>
            <div className={headerClass}>
                <div className={styles.meals_header_background}></div>
                <h1>Have a dish in mind?</h1>
                <div className={styles.meals_input}>
                    <input
                        value={recipeInput}
                        onChange={e => {
                            setRecipeInput(e.currentTarget.value);
                        }}>
                    </input>
                    <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} onClick={async () => {
                        const meals = await fetcher(`/api/meals?input=${recipeInput}&diet=${diet}`, false)
                        setLastInput(recipeInput)
                        if (meals._links.next) setNextLink(meals._links.next.href)
                        else setNextLink(false)
                        setRecipes([])
                        setRecipes(oldArr => [...oldArr, meals.hits]);
                    }} />
                    <button className={styles.tagButton}>
                        <FontAwesomeIcon className={styles.tagIcon} icon={faTag} />
                        <select onChange={(e) => handleChange(e)}>
                            <option value="balanced">Balanced</option>
                            <option value="high-protein">High Protein</option>
                            <option value="high-fiber">High Fiber</option>
                            <option value="low-carb">Low Carb</option>
                            <option value="low-fat">Low Fat</option>
                        </select>
                    </button>
                </div>
            </div>
            <div className={styles.recipes_container}>
                <div className={recipeListClass}>
                    <div className={styles.pages} ref={recipeRef}>
                    </div>
                    {recipes.length > 0 ? recipes.map((recipeList, index) => (

                        <div className={styles.recipe_chunk} key={index} id={index.toString()}>
                            {recipeList.map((curRecipe, index) => (
                                <div key={index} className={styles.recipe_card}>
                                    <img src={curRecipe.recipe.image} className={addedRecipes[curRecipe._links.self.href] ? styles.recipe_img_selected : ""} onClick={() => {
                                    window.open(`/meals/${encodeURIComponent(curRecipe._links.self.href)}`)
                                }}></img>
                                    {addedRecipes[curRecipe._links.self.href] ? <FontAwesomeIcon icon={faBookmark} className={styles.bookmarkSelected} onClick={async () => {
                                        var url = encodeURIComponent(curRecipe._links.self.href)
                                        const unfavorite = await fetcher(`/api/unfavorite?url=${url}&id=64f5ac47bd5c45df8ab214d9`, false)
                                        setAddedRecipes(addedRecipes => ({...addedRecipes, [curRecipe._links.self.href]: false }))
                                    }}></FontAwesomeIcon> : 
                                    
                                    <FontAwesomeIcon icon={faPlus} className={styles.bookmarkIcon} onClick={async () => {
                                        var url = encodeURIComponent(curRecipe._links.self.href)
                                        const favorite = await fetcher(`/api/favorite?url=${url}&id=64f5ac47bd5c45df8ab214d9`, false)
                                        setAddedRecipes(addedRecipes => ({...addedRecipes, [curRecipe._links.self.href]: true }))
                                    }}></FontAwesomeIcon>}
                                    <div className={addedRecipes[curRecipe._links.self.href] ? cn(styles.recipe_card_info, styles.recipe_info_selected) : styles.recipe_card_info}>
                                        {curRecipe.recipe.dishType ? ((curRecipe.recipe.dishType).toString()).toUpperCase() : ""}
                                        <label>{curRecipe.recipe.label}</label>
                                        {(Math.round(parseInt(curRecipe.recipe.calories))) + " calories & " + (Math.round(parseInt(curRecipe.recipe.totalNutrients.PROCNT.quantity))) + "g of protein"}
                                    </div>
                                </div>
                            ))}
                            <div />
                        </div>
                    )) : <></>}
                    <div className={styles.pages} ref={loadRef}>
                        {nextLink && lastInput ? <button onClick={loadMore}>Load More</button> : <></>}
                    </div>
                </div>
            </div>
        </main >
    )
}
