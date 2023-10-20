'use client'
import { useEffect, useState } from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './meal.module.css'
import axios from "axios";
import DrawerAppBar from 'app/components/Navbar.js'
import { Alert, Badge, Box, Button, Chip, Collapse, IconButton, Paper, Rating, Snackbar } from '@mui/material'
import { AccessAlarm, AccessAlarms, Bookmark, BookmarkBorder, Close, HourglassEmpty, Login } from '@mui/icons-material'
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
    const [loginWarning, setLoginWarning] = useState(false)
    var [recipe, setRecipe] = useState(false);
    let searchParams = (new URL(document.location)).searchParams;
    const [curId, setCurId] = useState("")
    var [addedRecipes, setAddedRecipes] = useState(false);

    var [row, setRows] = useState(createData('Loading...', 0, 0, 0, 0))
    var [likes, setLikes] = useState(0)

    const [inProcess, setProcess] = useState(false)

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    useEffect(() => {

        async function initRecipe() {
            let searchParams = (new URL(document.location)).searchParams;
            setCurId(searchParams.get("id"))
            if(getCookie("id") != ""){
                setCurId(getCookie("id"))
            }

            var myRecipe = await fetcher(`/api/meal?url=${params.id}`, false)
            setRecipe(myRecipe)

            if(getCookie("id") != ""){
                const getAddedRecipes = await fetcher(`/api/getRecipes?id=${getCookie("id")}`, false)
                getAddedRecipes.recipes.forEach(recipe => setAddedRecipes(addedRecipes => ({ ...addedRecipes, [recipe.url]: true })))
            }
            else if(searchParams.get("id") != "null"){
                const getAddedRecipes = await fetcher(`/api/getRecipes?id=${searchParams.get("id")}`, false)
                getAddedRecipes.recipes.forEach(recipe => setAddedRecipes(addedRecipes => ({ ...addedRecipes, [recipe.url]: true })))
            }

            const getLikes = await fetcher(`/api/likeCount?uri=${encodeURIComponent(myRecipe.recipe.uri)}`, false)
            setLikes(getLikes ? getLikes.users.length : 0)
            setRows(createData(myRecipe.recipe.label, Math.round(parseInt(myRecipe.recipe.calories)), Math.round(parseInt(myRecipe.recipe.totalNutrients.FAT.quantity)), Math.round(parseInt(myRecipe.recipe.totalNutrients.CHOCDF.quantity)), Math.round(parseInt(myRecipe.recipe.totalNutrients.PROCNT.quantity))))
        }
        initRecipe()
        return () => { }
    }, [])

    return <main className={styles.main}>
        <DrawerAppBar id={curId}></DrawerAppBar>
        {recipe ?
            <div className={styles.recipe}>
                <Snackbar sx={{right: '20px !important', left: 'auto !important'}} open={loginWarning} autoHideDuration={6000}>
                <Alert onClose={loginWarning} severity="info" sx={{ width: '100%' }} action={<>
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={()=>location.href="/login"}
                                            >
                                                <Login fontSize="inherit" />
                                            </IconButton>
                                            <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={()=>setLoginWarning(false)}
                                        >
                                            <Close fontSize="inherit" />
                                        </IconButton>
                                        </>
                                        }>
                    You must login to save meals!
                </Alert>
            </Snackbar>
                <Paper className={styles.recipe_card}>
                    <img src={recipe.recipe.images.LARGE ? recipe.recipe.images.LARGE.url : recipe.recipe.images.REGULAR.url}></img>
                    <div className={styles.recipe_card_content}>
                        <h1>{recipe.recipe.label}</h1>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                        {inProcess ? <Button startIcon={<HourglassEmpty color='primary' className={styles.loadingIcon}></HourglassEmpty>}></Button> : addedRecipes[recipe.recipe.uri] ?
                                            <Button startIcon={<Bookmark></Bookmark>} onClick={async () => {
                                                if(inProcess == false){
                                                    setProcess(true)
                                                    var url = encodeURIComponent(recipe.recipe.uri)
                                                    setLikes(likes-1);
                                                    setAddedRecipes(addedRecipes => ({ ...addedRecipes, [recipe.recipe.uri]: false }))
                                                    const unfavorite = await fetcher(`/api/unfavorite?url=${url}&id=${curId}`, false)
                                                    setProcess(false)
                                                } else {
                                                    setLoginWarning(true)
                                                }
                                            }}>{likes}</Button>
                                            :
                                            <Button startIcon={<BookmarkBorder></BookmarkBorder>} onClick={async () => {
                                                if(inProcess == false && curId != "null" && curId != ""){
                                                    setProcess(true)
                                                    var url = encodeURIComponent(recipe.recipe.uri)
                                                    setLikes(likes+1);
                                                    setAddedRecipes(addedRecipes => ({ ...addedRecipes, [recipe.recipe.uri]: true }))
                                                    const favorite = await fetcher(`/api/favorite?url=${url}&id=${curId}`, false)
                                                    setProcess(false)
                                                }else {
                                                    setLoginWarning(true)
                                                }
                                            }}>
                                                {likes}
                                            </Button>
                                            }
                                            {recipe.recipe.dietLabels.map((label, index) => (
                                                 <Chip label={label} sx={{marginRight: '10px'}} variant={addedRecipes[recipe.recipe.uri] ? '' : 'outlined'} />
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