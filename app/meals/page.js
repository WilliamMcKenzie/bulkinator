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
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axios from 'axios'

const fetcher = (url, data) => {
    return axios.get(url, data).then(res => res.data);
};

export default function Home() {

    const recipeRef = useRef();

    const [recipes, setRecipes] = useState([]);
    const [recipeInput, setRecipeInput] = useState('');
    const [nextLink, setNextLink] = useState("")
    const [lastInput, setLastInput] = useState("")

    const [recipeListClass, setRecipeListClass] = useState(cn(styles.recipes_list))

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            if (entry.isIntersecting) setRecipeListClass(cn(styles.recipes_list))
            else setRecipeListClass(cn(styles.recipes_list, styles.recipes_list_full_view))
        });
        observer.observe(recipeRef.current);
    }, []);

    useEffect(() => {

        async function callProtein() {
            const meals = await fetcher(`/api/meals?input=protein%20meals`, false)
            setRecipes(oldArr => [...oldArr, meals.hits]);
            if (meals._links.next) {
                setNextLink(meals._links.next.href)
            }
            else setNextLink(false)
        }
        callProtein()
        return () => { }
    }, [])

    const loadMore = async () => {
        observer.observe(document.getElementById('0'));
        if (lastInput && nextLink) {
            const meals = await fetcher(`/api/nextPage?url=${nextLink}&input=${lastInput}`, false)
            setRecipes(oldArr => [...oldArr, meals.hits]);
            if (meals._links.next) setNextLink(meals._links.next.href)
            else setNextLink(false)
        }
    }

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
            <div className={styles.meals_header}>
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
                        const meals = await fetcher(`/api/meals?input=${recipeInput}`, false)
                        setLastInput(recipeInput)
                        if (meals._links.next) setNextLink(meals._links.next.href)
                        else setNextLink(false)
                        setRecipes([])
                        setRecipes(oldArr => [...oldArr, meals.hits]);
                    }} />
                    <FontAwesomeIcon className={styles.heartIcon} icon={faHeart} />
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
                                    <img src={curRecipe.recipe.image}></img>
                                    <div className={styles.recipe_card_info}>
                                        {curRecipe.recipe.dishType ? ((curRecipe.recipe.dishType).toString()).toUpperCase() : ""}
                                        <label>{curRecipe.recipe.label}</label>
                                        {(Math.round(parseInt(curRecipe.recipe.calories))) + " calories & " + (Math.round(parseInt(curRecipe.recipe.totalNutrients.PROCNT.quantity))) + "g of protein"}
                                    </div>
                                </div>
                            ))}
                            <div />
                        </div>
                    )) : <></>}
                    <div className={styles.pages}>
                        {nextLink && lastInput ? <button onClick={loadMore}>Load More</button> : <></>}
                    </div>
                </div>
            </div>
        </main >
    )
}
