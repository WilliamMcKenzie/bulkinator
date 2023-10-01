'use client'
import Image from 'next/image'
import styles from '../modulestyle/planner.module.css'
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

    const [recipes, setRecipes] = useState([]);

    const [recipeListClass, setRecipeListClass] = useState(cn(styles.recipes_list))
    const [headerClass, setHeaderClass] = useState(cn(styles.meals_header, styles.meals_header_contain_view))

    useEffect(() => {
        setRecipeListClass(cn(styles.recipes_list, styles.recipes_list_full_view))
        setHeaderClass(cn(styles.meals_header, styles.meals_header_contain_view))
        // const observer = new IntersectionObserver((entries, observer) => {
        //     const entry = entries[0];
        //     if (entry.isIntersecting) {
        //         setRecipeListClass(cn(styles.recipes_list))
        //         setHeaderClass(cn(styles.meals_header))
        //     }
        //     else {
        //         setRecipeListClass(cn(styles.recipes_list, styles.recipes_list_full_view))
        //         setHeaderClass(cn(styles.meals_header, styles.meals_header_contain_view))
        //     }
        // });
        // observer.observe(recipeRef.current);
    }, []);

    useEffect(() => {
        var meals

        async function init() {
            meals = await fetcher(`/api/getFavoritedRecipes?id=64f7aec6d557116bbb8a6ca4`, false)
            setRecipes([meals.hits]);
        }

        init()

        console.log(meals)
        return () => { }
    }, [])

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
                    <a className={styles.register} onClick={console.log(recipes)}>
                        Register
                    </a>
                </div>
            </div>

            <div className={styles.meals_background}></div>
            <div className={headerClass}>
                <div className={styles.meals_header_background}></div>
                <h1>What are you trying to do?</h1>
                <div className={styles.meals_input}>
                    <button onClick={console.log(recipes)}>Bulk</button>
                    <button>Cut</button>
                </div>
            </div>
            <div className={styles.recipes_container}>
                <div className={recipeListClass}>
                    {recipes && recipes.length >= 0 ? recipes.map((recipeList, index) => (

                        <div className={styles.recipe_chunk} key={index} id={index.toString()}>
                            {recipeList.map((curRecipe, index) => (
                                <div key={index} className={styles.recipe_card}>
                                    <img src={curRecipe.recipe.image} className={addedRecipes[curRecipe._links.self.href] ? styles.recipe_img_selected : ""} onClick={() => {
                                        window.open(`/meals/${encodeURIComponent(curRecipe._links.self.href)}`)
                                    }}></img>
                                    <FontAwesomeIcon icon={faPlus} className={styles.bookmarkIcon} onClick={async () => {
                                        console.log(recipes)
                                    }}></FontAwesomeIcon>

                                    <div className={addedRecipes[curRecipe._links.self.href] ? cn(styles.recipe_card_info, styles.recipe_info_selected) : styles.recipe_card_info}>
                                        <label>{curRecipe.recipe.dishType ? ((curRecipe.recipe.dishType).toString()).toUpperCase() : ""}</label>
                                        {(Math.round(parseInt(curRecipe.recipe.calories))) + " calories & " + (Math.round(parseInt(curRecipe.recipe.totalNutrients.PROCNT.quantity))) + "g of protein"}
                                    </div>
                                </div>
                            ))}
                            <div />
                        </div>
                    )) : <h1>You have not liked any meals!</h1>}
                </div>
            </div>
        </main >
    )
}
