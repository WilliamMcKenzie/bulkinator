'use client'
import styles from '../modulestyle/planner.module.css'
import cn from "classnames";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
config.autoAddCss = false

import { faArrowsRotate, faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const fetcher = (url, data) => {
    return axios.get(url, data).then(res => res.data);
};

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
        title: {
            display: true,
            text: 'Weight over time (lbs)',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Weight (2023)',
            data: labels.map(() => faker.datatype.number({ min: 100, max: 200 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export default function Home() {

    const weightsEndRef = useRef()
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

        setRecipes([])

        async function init() {
            meals = await fetcher(`/api/getFavoritedRecipes?id=64f7aec6d557116bbb8a6ca4`, false)
            meals.forEach(recipe => setRecipes(recipes => [...recipes, recipe.hits]))
            scrollTo(weightsEndRef)
        }

        init()
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
            <div className={styles.meal_planner_section}>
                <div className={styles.recipes_container}>
                    <div className={recipeListClass}>
                        {recipes && recipes.length >= 0 ? recipes.map((recipeList, index) => (

                            <div className={styles.recipe_chunk} key={index} id={index.toString()}>
                                {recipeList.map((curRecipe, index) => (
                                    <div key={index} className={styles.recipe_card}>
                                        <img src={curRecipe.recipe.image} onClick={() => {
                                            window.open(`/meals/${encodeURIComponent(curRecipe._links.self.href)}`)
                                        }}></img>
                                        <FontAwesomeIcon icon={faPlus} className={styles.bookmarkIcon} onClick={async () => {
                                            console.log(recipes)
                                        }}></FontAwesomeIcon>

                                        <div className={styles.recipe_card_info}>
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
                <div className={styles.meal_planner_container}>

                </div>
            </div>

            <div className={styles.weight_tracker_section}>
                <div className={styles.weight_tracker_statistics}>
                    <div className={styles.weight_tracker_header}>
                        <h1><FontAwesomeIcon icon={faArrowsRotate} className={styles.spinIcon} />{" "}Bulk Day 120</h1>
                        <p>Up 54lbs</p>
                    </div>
                    <div className={styles.weight_list_container}>
                        <ul className={styles.weight_list}>
                            <li><div>January 1st: <p contentEditable={true}>20</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
                            <li><div>January 1st: <p contentEditable={true}>20</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
                            <li><div>January 1st: <p contentEditable={true}>20</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
                            <li><div>January 1st: <p contentEditable={true}>20</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
                            <li><div>January 1st: <p contentEditable={true}>20</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
                            <div ref={weightsEndRef}>
                            </div>
                        </ul>
                        <p className={styles.invisible_input}><input placeholder='Weight (lbs)'></input> <FontAwesomeIcon icon={faPlus} className={styles.addIcon} /> <FontAwesomeIcon icon={faFloppyDisk} className={styles.saveIcon} /></p>
                        <p className={styles.weight_list_input}><input placeholder='Weight (lbs)'></input> <FontAwesomeIcon icon={faPlus} className={styles.addIcon} /> <FontAwesomeIcon icon={faFloppyDisk} className={styles.saveIcon} /></p>
                    </div>
                    <div className={styles.weight_graph}>
                        <Line options={options} data={data} />
                    </div>
                </div>
            </div>
        </main >
    )
}
