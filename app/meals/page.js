'use client'
import Image from 'next/image'
import styles from '../modulestyle/meals.module.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

    const [recipes, setRecipes] = useState([]);
    const [recipeInput, setRecipeInput] = useState('');
    const [pages, setPages] = useState([])


    useEffect(() => {

        async function callProtein() {
            const meals = await fetcher(`/api/meals?input=protein`, false)
            setRecipes(meals.hits)
        }
        callProtein()
        return () => { }
    }, [])

    const nextPage = () => {

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
                        console.log(meals.hits)
                        setRecipes(meals.hits)
                    }} />
                    <FontAwesomeIcon className={styles.heartIcon} icon={faHeart} />
                </div>
            </div>

            <div className={styles.recipes_list}>
                {recipes.length > 0 ? recipes.map((recipe, index) => (
                    <div key={index} className={styles.recipe_card}>
                        <img src={recipe.recipe.image}></img>
                        <div className={styles.recipe_card_info}>
                            {((recipe.recipe.dishType).toString()).toUpperCase()}
                            <label>{recipe.recipe.label}</label>
                            {(Math.round(parseInt(recipe.recipe.calories))) + " calories"}
                        </div>
                    </div>
                )) : <h1>Sorry !! No recipes found</h1>}
            </div>
            <div className={styles.pages}>
                    <button>Prev</button>
                    <button>Next</button>
                </div>
        </main >
    )
}
