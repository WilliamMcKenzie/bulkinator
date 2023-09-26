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


    useEffect(() => {

        async function callProtein() {
            const meals = await fetcher(`/api/meals?input=protein`, false)
            setRecipes(meals.hits)
        }
        callProtein()
        return () => { }
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.navbar_background}></div>
            <div className={styles.navbar}>
                <h1 className={styles.logo_container}>
                    <img src="data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7"></img>
                    BULKINATOR
                </h1>
                <div className={styles.navbar_buttons}>
                    <a href="./">
                        Home
                    </a>
                    <a className={styles.highlighted} href="./meals">
                        Meals
                    </a>
                    <a href="./exercises">
                        Excercises
                    </a>
                </div>
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
                {recipes.map((recipe, index) => (
                    <div key={index} className={styles.recipe_card}>
                        <img src={recipe.recipe.image}></img>
                        <div className={styles.recipe_card_info}>
                            {recipe.recipe.label}
                            <br></br>
                            {(Math.round(parseInt(recipe.recipe.calories))) + " calories"}
                        </div>
                    </div>
                ))}
            </div>
        </main >
    )
}
