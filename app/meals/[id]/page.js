'use client'
import { useEffect, useState } from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './meal.module.css'
import axios from "axios";
import DrawerAppBar from 'app/components/Navbar.js'
import { IconButton, Paper, Rating } from '@mui/material'
import { Bookmark, BookmarkBorder } from '@mui/icons-material'


const fetcher = (url, data) => {
    return axios.get(url, data).then(res => res.data);
};

export default function Page({ params }) {
    var [recipe, setRecipe] = useState(false);
    var [addedRecipes, setAddedRecipes] = useState(false);

    useEffect(() => {

        async function initRecipe() {
            var myRecipe = await fetcher(`/api/meal?url=${params.id}`, false)
            setRecipe(myRecipe)
            const getAddedRecipes = await fetcher(`/api/getRecipes?id=64f7aec6d557116bbb8a6ca4`, false)

            getAddedRecipes.recipes.forEach(recipe => setAddedRecipes(addedRecipes => ({ ...addedRecipes, [recipe.url]: true })))
        }
        initRecipe()
        return () => { }
    }, [])

    return <main className={styles.main}>
        <DrawerAppBar></DrawerAppBar>
        {recipe ?
            <div className={styles.recipe}>
                <Paper className={styles.recipe_card}>
                    <img src={recipe.recipe.images.LARGE ? recipe.recipe.images.LARGE.url : recipe.recipe.images.REGULAR.url}></img>
                    <div className={styles.recipe_card_content}>
                        <h1>{recipe.recipe.label}</h1>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                        {addedRecipes[recipe.recipe.uri] ?
                                            <IconButton aria-label='unadd to favorites'>
                                                <Bookmark sx={{color:'#2196f3'}} onClick={async () => {
                                                    var url = encodeURIComponent(recipe.recipe.uri)
                                                    const unfavorite = await fetcher(`/api/unfavorite?url=${url}&id=64f7aec6d557116bbb8a6ca4`, false)
                                                    setAddedRecipes(addedRecipes => ({ ...addedRecipes, [recipe.recipe.uri]: false }))
                                                }} />
                                            </IconButton>
                                            :
                                            <IconButton aria-label="add to favorites">
                                                <BookmarkBorder onClick={async () => {
                                                    var url = encodeURIComponent(recipe.recipe.uri)
                                                    const favorite = await fetcher(`/api/favorite?url=${url}&id=64f7aec6d557116bbb8a6ca4`, false)
                                                    setAddedRecipes(addedRecipes => ({ ...addedRecipes, [recipe.recipe.uri]: true }))
                                                }} />
                                            </IconButton>}
                                            <Rating name="no-value" value={null}/>

                        </div>
                        <p>Find the full recipe at <a href={recipe.recipe.url}>{recipe.recipe.source}</a></p>
                        <div className={styles.quick_macros}>
                            <p>{(Math.round(parseInt(recipe.recipe.calories))) + " calories"}</p>
                            <p>{(Math.round(parseInt(recipe.recipe.totalNutrients.PROCNT.quantity))) + "g protein"}</p>
                            <p>{(Math.round(parseInt(recipe.recipe.totalNutrients.FAT.quantity))) + "g fat"}</p>
                            <p>{(Math.round(parseInt(recipe.recipe.totalNutrients.CHOCDF.quantity))) + "g carbs"}</p>
                            <p>{(Math.round(parseInt(recipe.recipe.totalNutrients.SUGAR.quantity))) + "g sugars"}</p>
                            <p><FontAwesomeIcon icon={faClockRotateLeft}></FontAwesomeIcon> {" " + recipe.recipe.totalTime + "m"}</p>
                        </div>
                    </div>
                </Paper>
                <Paper className={styles.full_details}>
                    <div className={styles.ingredients}>
                        <h1>Ingredients</h1>
                        {recipe.recipe.ingredientLines.map((curRecipe, index) => (
                            <p key={index}>{curRecipe}</p>
                        ))}
                    </div>
                    <div className={styles.nutrition}>
                        <h1>Nutrition</h1>
                        <p>Calories <a>{" " + (Math.round(parseInt(recipe.recipe.totalNutrients.ENERC_KCAL.quantity))) + recipe.recipe.totalNutrients.ENERC_KCAL.unit}</a></p>
                        <p className={styles.nutrition_header}> Fats
                            <p>Fat (net) <a>{" " + (Math.round(parseInt(recipe.recipe.totalNutrients.FAT.quantity))) + recipe.recipe.totalNutrients.FAT.unit}</a></p>
                            <p>Saturated <a>{" " + (Math.round(parseInt(recipe.recipe.totalNutrients.FASAT.quantity))) + recipe.recipe.totalNutrients.FASAT.unit}</a></p>
                            <p>Trans <a>{" " + (Math.round(parseInt(recipe.recipe.totalNutrients.FATRN.quantity))) + recipe.recipe.totalNutrients.FATRN.unit}</a></p>
                        </p>
                        <p className={styles.nutrition_header}>Carbs: {" " + (Math.round(parseInt(recipe.recipe.totalNutrients.CHOCDF.quantity))) + recipe.recipe.totalNutrients.CHOCDF.unit}
                            <p>Carbs <a>{" " + (Math.round(parseInt(recipe.recipe.totalNutrients.CHOCDF.quantity))) + recipe.recipe.totalNutrients.CHOCDF.unit}</a></p>
                            <p>Fiber <a>{" " + (Math.round(parseInt(recipe.recipe.totalNutrients.FIBTG.quantity))) + recipe.recipe.totalNutrients.FIBTG.unit}</a></p>
                            <p>Sugar <a>{" " + (Math.round(parseInt(recipe.recipe.totalNutrients.SUGAR.quantity))) + recipe.recipe.totalNutrients.SUGAR.unit}</a></p>
                        </p>
                        <p>Protein <a>{" " + (Math.round(parseInt(recipe.recipe.totalNutrients.PROCNT.quantity))) + recipe.recipe.totalNutrients.PROCNT.unit}</a></p>
                        <p>Sodium <a>{" " + (Math.round(parseInt(recipe.recipe.totalNutrients.NA.quantity))) + recipe.recipe.totalNutrients.NA.unit}</a></p>
                        <p></p>
                    </div>
                </Paper>
            </div> : <></>}

    </main>
}