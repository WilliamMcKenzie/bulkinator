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
import DrawerAppBar from '../components/Navbar'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Avatar, Box, Button, ButtonGroup, Checkbox, Collapse, FormControl, FormControlLabel, FormGroup, ImageList, ImageListItem, InputLabel, MenuItem, Modal, Paper, Rating, Select, TextField, ThemeProvider, ToggleButton, ToggleButtonGroup, createMuiTheme } from '@mui/material';
import { Bookmark, BookmarkBorder, Close, Favorite, FavoriteBorder, Login, OpenInBrowser, OpenInNew, Search } from '@mui/icons-material';


const fetcher = (url, data) => {
    return axios.get(url, data).then(res => res.data);
};

export default function Home() {
    const [loginWarning, setLoginWarning] = useState(false)

    var [addedRecipes, setAddedRecipes] = useState({})

    const [curId, setCurId] = useState("")

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
            let params = (new URL(document.location)).searchParams;
            setCurId(params.get("id"))

            const meals = await fetcher(`/api/meals?input=protein%20meals&diet=high-protein`, false)
            setRecipes([meals.hits]);
            if (meals._links.next) {
                setNextLink(meals._links.next.href)
            }
            else setNextLink(false)


            if(curId != "null"){
             const getAddedRecipes = await fetcher(`/api/getRecipes?id=${params.get("id")}`, false)
             getAddedRecipes.recipes.forEach(recipe => setAddedRecipes(addedRecipes => ({ ...addedRecipes, [recipe.url]: true })))
            }
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
            <DrawerAppBar id={curId}></DrawerAppBar>
            <Collapse in={loginWarning}>
                <Alert  sx={{position: 'absolute', top:'8vh', left:'50%', width:'calc(100% - 150vh)', display:'flex', alignItems:'center', paddingLeft:'75vh', paddingRight:'75vh', zIndex: 1099, transform: 'translate(-50%, 0)'}} action={<>
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {location.href = '/login'}}
                                            >
                                                <Login size="1rem"/>
                                            </IconButton>
                                            <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {setLoginWarning(false)}}
                                        >
                                            <Close size="1rem"/>
                                        </IconButton>
                                        </>
                                        } severity="info">
                You must login to save meals
                </Alert>                 
           </Collapse>

            <div className={styles.meals_background}></div>
            <div className={headerClass}>
                <div className={styles.meals_header_background}></div>
                <h1>Have a dish in mind?</h1>
                <div style={{ padding: 0.5, display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                    <TextField id="outlined-basic" label="Meal" variant="outlined" value={recipeInput}
                        onChange={e => {
                            setRecipeInput(e.currentTarget.value);
                        }}
                        sx={{ margin: 1 }}></TextField>

                    <FormControl sx={{ margin: 1 }}>
                        <InputLabel id="demo-simple-select-label">Diet</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={diet}
                            label="Diet"
                            onChange={handleChange}
                        >
                            <MenuItem value="balanced">Balanced</MenuItem>
                            <MenuItem value="high-protein">High Protein</MenuItem>
                            <MenuItem value="high-fiber">High Fiber</MenuItem>
                            <MenuItem value="low-carb">Low Carb</MenuItem>
                            <MenuItem value="low-fat">Low Fat</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton sx={{ margin: 1 }} onClick={async () => {
                        const meals = await fetcher(`/api/meals?input=${recipeInput}&diet=${diet}`, false)
                        setLastInput(recipeInput)
                        if (meals._links.next) setNextLink(meals._links.next.href)
                        else setNextLink(false)
                        setRecipes([])
                        setRecipes(oldArr => [...oldArr, meals.hits]);
                    }}>
                        <Search></Search>
                    </IconButton>
                </div>
            </div>
            
            <div className={styles.recipes_container}>
                <div className={recipeListClass}>
                    <div className={styles.pages} ref={recipeRef}>
                    </div>
                    {recipes.length > 0 ? recipes.map((recipeList, index) => (

                        <div className={styles.recipe_chunk} key={index} id={index.toString()}>
                            {recipeList.map((curRecipe, index) => (
                                <Card sx={{ maxWidth: 345 }} className={addedRecipes[curRecipe.recipe.uri] ? styles.recipe_card_selected : styles.recipe_card}>
                                    <CardHeader sx={{ width: '100%', overflow: 'hidden' }}
                                        titleTypographyProps={{ variant: 'h8' }}
                                        title={curRecipe.recipe.label.length > 25 ? curRecipe.recipe.label.substr(0, 25) + "..." : curRecipe.recipe.label}
                                        subheaderTypographyProps={{ variant: 'subtitles10' }}
                                        subheader={Math.round(curRecipe.recipe.calories) + " Calories"}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={curRecipe.recipe.image}
                                        alt="food"
                                    />
                                    <CardActions disableSpacing>
                                        {addedRecipes[curRecipe.recipe.uri] ?
                                            <IconButton aria-label='unadd to favorites'>
                                                <Bookmark sx={{color:'#2196f3'}} onClick={async () => {
                                                    var url = encodeURIComponent(curRecipe.recipe.uri)
                                                    setAddedRecipes(addedRecipes => ({ ...addedRecipes, [curRecipe.recipe.uri]: false }))
                                                    const unfavorite = await fetcher(`/api/unfavorite?url=${url}&id=${curId}`, false)
                                                }} />
                                            </IconButton>
                                            :
                                            <IconButton aria-label="add to favorites">
                                                <BookmarkBorder onClick={async () => {
                                                    if(curId != "null"){
                                                        var url = encodeURIComponent(curRecipe.recipe.uri)
                                                        setAddedRecipes(addedRecipes => ({ ...addedRecipes, [curRecipe.recipe.uri]: true }))
                                                        const favorite = await fetcher(`/api/favorite?url=${url}&id=${curId}`, false)
                                                    } else {
                                                        setLoginWarning(true)
                                                    }
                                                }} />
                                            </IconButton>}
                                        <IconButton aria-label="open in new tab">
                                            <OpenInNew onClick={() => {
                                                window.open(`/meals/${encodeURIComponent(curRecipe._links.self.href)}?id=${curId}`)
                                            }} />
                                        </IconButton>
                                        </CardActions>
                                </Card>
                                // <div key={index} className={styles.recipe_card}>
                                //     <img src={curRecipe.recipe.image} className={addedRecipes[curRecipe.recipe.uri] ? styles.recipe_img_selected : ""} onClick={() => {
                                //         window.open(`/meals/${encodeURIComponent(curRecipe._links.self.href)}`)
                                //     }}></img>
                                //     {addedRecipes[curRecipe.recipe.uri] ? <FontAwesomeIcon icon={faBookmark} className={styles.bookmarkSelected} onClick={async () => {
                                //         var url = encodeURIComponent(curRecipe.recipe.uri)
                                //         const unfavorite = await fetcher(`/api/unfavorite?url=${url}&id=64f7aec6d557116bbb8a6ca4`, false)
                                //         setAddedRecipes(addedRecipes => ({ ...addedRecipes, [curRecipe.recipe.uri]: false }))
                                //     }}></FontAwesomeIcon> :

                                //         <FontAwesomeIcon icon={faPlus} className={styles.bookmarkIcon} onClick={async () => {
                                //             var url = encodeURIComponent(curRecipe.recipe.uri)
                                //             const favorite = await fetcher(`/api/favorite?url=${url}&id=64f7aec6d557116bbb8a6ca4`, false)
                                //             setAddedRecipes(addedRecipes => ({ ...addedRecipes, [curRecipe.recipe.uri]: true }))
                                //         }}></FontAwesomeIcon>}
                                //     <div className={addedRecipes[curRecipe.recipe.uri] ? cn(styles.recipe_card_info, styles.recipe_info_selected) : styles.recipe_card_info}>
                                //         {curRecipe.recipe.dishType ? ((curRecipe.recipe.dishType).toString()).toUpperCase() : ""}
                                //         <label>{curRecipe.recipe.label}</label>
                                //         {(Math.round(parseInt(curRecipe.recipe.calories))) + " calories & " + (Math.round(parseInt(curRecipe.recipe.totalNutrients.PROCNT.quantity))) + "g of protein"}
                                //     </div>
                                // </div>
                            ))}
                            <div />
                        </div>
                    )) : <></>}
                    <div className={styles.pages} ref={loadRef}>
                        {nextLink && lastInput ? <Button onClick={loadMore} sx={{ marginTop: 1 }}>Load More</Button> : <></>}
                    </div>
                </div>
            </div>
        </main >
    )
}