'use client'
import { useEffect, useState } from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './meal.module.css'
import axios from "axios";
import DrawerAppBar from 'app/components/Navbar.js'
import { Chip, IconButton, Paper, Rating } from '@mui/material'
import { AccessAlarm, AccessAlarms, Bookmark, BookmarkBorder } from '@mui/icons-material'
import EnhancedTable from '../../components/EnhancedTable'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const fetcher = (url, data) => {
    return axios.get(url, data).then(res => res.data);
};

export default function Page({ params }) {
    var [recipe, setRecipe] = useState(false);
    var [curId, setCurId] = useState('6525cc4cb23307fe32b6b006')
    var [addedRecipes, setAddedRecipes] = useState(false);

    var [row, setRows] = useState(createData('Frozen yoghurt', 159, 6.0, 24, 4.0))

    

    useEffect(() => {

        async function initRecipe() {
            var myRecipe = await fetcher(`/api/meal?url=${params.id}`, false)
            setRecipe(myRecipe)
            const getAddedRecipes = await fetcher(`/api/getRecipes?id=${curId}`, false)

            getAddedRecipes.recipes.forEach(recipe => setAddedRecipes(addedRecipes => ({ ...addedRecipes, [recipe.url]: true })))

            setRows(createData(myRecipe.recipe.label, Math.round(parseInt(myRecipe.recipe.calories)), Math.round(parseInt(myRecipe.recipe.totalNutrients.FAT.quantity)), Math.round(parseInt(myRecipe.recipe.totalNutrients.CHOCDF.quantity)), Math.round(parseInt(myRecipe.recipe.totalNutrients.PROCNT.quantity))))
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
                                                    setAddedRecipes(addedRecipes => ({ ...addedRecipes, [recipe.recipe.uri]: false }))
                                                    const unfavorite = await fetcher(`/api/unfavorite?url=${url}&id=${curId}`, false)
                                                }} />
                                            </IconButton>
                                            :
                                            <IconButton aria-label="add to favorites">
                                                <BookmarkBorder onClick={async () => {
                                                    var url = encodeURIComponent(recipe.recipe.uri)
                                                    setAddedRecipes(addedRecipes => ({ ...addedRecipes, [recipe.recipe.uri]: true }))
                                                    const favorite = await fetcher(`/api/favorite?url=${url}&id=${curId}`, false)
                                                
                                                }} />
                                            </IconButton>}
                                            {recipe.recipe.dietLabels.map((label, index) => (
                                                <Chip label={label} variant="outlined" sx={{marginRight: '5px'}}/>
                                            ))}
                                            <p style={{display: 'flex', margin: 0, alignItems:'center', color:'rgb(100 100 100 / 87%)'}}><AccessAlarms sx={{color: 'rgb(100 100 100 / 87%)'}}></AccessAlarms> {" " + recipe.recipe.totalTime + "m"}</p>
                                            
                        </div>
                        <p>Find the full recipe at <a href={recipe.recipe.url}>{recipe.recipe.source}</a></p>
                        <div className={styles.quick_macros}>
                            <p>{(Math.round(parseInt(recipe.recipe.calories))) + " calories"}</p>
                            <p>{(Math.round(parseInt(recipe.recipe.totalNutrients.PROCNT.quantity))) + "g protein"}</p>
                            <p>{(Math.round(parseInt(recipe.recipe.totalNutrients.FAT.quantity))) + "g fat"}</p>
                            <p>{(Math.round(parseInt(recipe.recipe.totalNutrients.CHOCDF.quantity))) + "g carbs"}</p>
                            <p>{(Math.round(parseInt(recipe.recipe.totalNutrients.SUGAR.quantity))) + "g sugars"}</p>
                        </div>
                    </div>
                </Paper>
                <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Nutrients</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper className={styles.full_details}>
                    <div className={styles.ingredients}>
                        <h1>Ingredients</h1>
                        {recipe.recipe.ingredientLines.map((curRecipe, index) => (
                            <p key={index}>{curRecipe}</p>
                        ))}
                    </div>
                </Paper>
            </div> : <></>}

    </main>
}