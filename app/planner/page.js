'use client'
import styles from '../modulestyle/planner.module.css'
import cn from "classnames";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
config.autoAddCss = false

import { faArrowsRotate, faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useReducer, useRef, useState } from 'react'
import axios from 'axios'

import EnhancedTable from '../components/EnhancedTable'
import DrawerAppBar from '../components/Navbar'

//recipe cards 
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import { Alert, AlertTitle, Backdrop, Box, Button, ButtonGroup, Checkbox, CircularProgress, Collapse, FormControlLabel, FormGroup, ImageList, ImageListItem, Modal, Paper, Snackbar, ThemeProvider, ToggleButton, ToggleButtonGroup, Tooltip, createMuiTheme } from '@mui/material';

//input 
import TextField from '@mui/material/TextField';
import { Check, Close, Delete, DeleteOutline, Egg, Fastfood, GrassOutlined, HourglassEmpty, NoFood, RemoveCircle, Save } from '@mui/icons-material';

const fetcher = (url, data) => {
    if(data){
        return axios.post(url, data).then(res => res.data);
    } else{
        return axios.get(url, data).then(res => res.data);
    }
};

export default function Home() {

    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    var [curId, setCurId] = useState('')

    //theme
    const lightTheme = createMuiTheme({
        palette: {
            type: "light",
            primary: {
                light: "#ff9d4d",
                main: "#2196f3",
                dark: "#b35000"
            }
        }
    });

    const weightsEndRef = useRef()
    const [recipes, setRecipes] = useState([]);

    const [recipeListClass, setRecipeListClass] = useState(cn(styles.recipes_list))
    const [headerClass, setHeaderClass] = useState(cn(styles.meals_header, styles.meals_header_contain_view))


    //calories 
    const [calories, setCalories] = useState(2400);

    function handler(e) {
        if (Number(e.target.value) > 10000) {
            setCalories(10000);
        }
        else {
            setCalories(e.target.value);
        }
    }

    //diet
    const [diet, setDiet] = useState('');

    const handleChange = (event, newAlignment) => {
        setDiet(newAlignment);
    };
    const control = {
        value: diet,
        onChange: handleChange,
        exclusive: true,
    };

    const [selectedRecipe, setSelectedRecipe] = useState({})

    //include snacking
    const [checked, setChecked] = useState(true);

    const snackingChange = (event) => {
        setChecked(event.target.checked);
        setSnack1Checked(false)
        setSnack2Checked(false)
    };

    //init

    useEffect(() => {
        setRecipeListClass(cn(styles.recipes_list, styles.recipes_list_full_view))
        setHeaderClass(cn(styles.meals_header, styles.meals_header_contain_view))
    }, []);

    const [breakfast, setBreakfast] = useState([])
    const [breakfastServings, setBreakfastServings] = useState([])

    const [lunch, setLunch] = useState([])
    const [lunchServings, setLunchServings] = useState([])

    const [dinner, setDinner] = useState([])
    const [dinnerServings, setDinnerServings] = useState([])

    const [snack1, setSnack1] = useState([])
    const [snack1Servings, setSnack1Servings] = useState([])

    const [snack2, setSnack2] = useState([])
    const [snack2Servings, setSnack2Servings] = useState([])

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

        setRecipes([])

        async function init() {
            let params = (new URL(document.location)).searchParams;
            var id = params.get("id")
            if(getCookie("id") != ""){
                id = getCookie("id")
            }

            setCurId(id)
            

            if(id != 'null' && id && id != ''){
                setBackdrop(true);
                var user = await fetcher(`/api/getPlan?id=${id}`)
                if (user.plan && user.plan.date == (new Date).getDate()){
                    setBreakfast(user.plan.breakfast.recipes)
                    setBreakfastServings(user.plan.breakfast.servings)

                    setLunch(user.plan.lunch.recipes)
                    setLunchServings(user.plan.lunch.servings)

                    setDinner(user.plan.dinner.recipes)
                    setDinnerServings(user.plan.dinner.servings)

                    if(user.plan.snack1.recipes != []){
                        setSnack1(user.plan.snack1.recipes)
                        setSnack1Servings(user.plan.snack1.servings)
                    }
                    if(user.plan.snack2.recipes != []){
                        setSnack2(user.plan.snack2.recipes)
                        setSnack2Servings(user.plan.snack2.servings)
                    }

                    var meals = await fetcher(`/api/getFavoritedRecipes?id=${id}`, false)
                    setRecipes([])
                    meals.forEach(recipe => setRecipes(recipes => [...recipes, recipe.hits]))

                    setGenerated(true)
                    setBackdrop(false);
                } else {
                    setBackdrop(false);
                }
            } else {
                setBackdrop(false);
            }
        }
        

        init()
        history.replaceState({}, null, "/planner");
    }, [])

    

    //fetch meal plan

    var totalCals = calories
    var calorieChart = { breakfast: 0, lunch: 0, dinner: 0, snack1: 0, snack2: 0 }

    if (checked) {
        var cals = [totalCals / 3, totalCals / 1.5]
        calorieChart = { breakfast: cals[1] / 3, snack1: cals[0] / 2, lunch: cals[1] / 3, snack2: cals[0] / 2, dinner: cals[1] / 3 }
    } else {
        var cals = [totalCals]
        calorieChart = { breakfast: cals[0] / 3, lunch: cals[0] / 3, dinner: cals[0] / 3, snack1: 0, snack2: 0 }
    }

    //saveButton
    const [savePopup, setSavePopup] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)

    const save = async () => {

        setSaveLoading(true)

        if(curId != "null" && curId){
            for(var i = 0; i < breakfast.length; i++){
                breakfast[i].savedPlan = true
            }
            for(var i = 0; i < snack1.length; i++){
                snack1[i].savedPlan = true
            }
            for(var i = 0; i < lunch.length; i++){
                lunch[i].savedPlan = true
            }
            for(var i = 0; i < snack2.length; i++){
                snack2[i].savedPlan = true
            }
            for(var i = 0; i < dinner.length; i++){
                dinner[i].savedPlan = true
            }
    
            var breakfastJSON = {
                recipes: breakfast,
                servings: breakfastServings
            }
            var snack1JSON = {
                recipes: snack1,
                servings: snack1Servings
            }
            var lunchJSON = {
                recipes: lunch,
                servings: lunchServings
            }
            var snack2JSON = {
                recipes: snack2,
                servings: snack2Servings
            }
            var dinnerJSON = {
                recipes: dinner,
                servings: dinnerServings
            }
    
            var uploadPlan = await fetcher(`/api/uploadPlan`, {breakfast: breakfastJSON, snack1: snack1JSON, lunch: lunchJSON, snack2: snack2JSON, dinner: dinnerJSON, id: curId})
        }

        setSaveLoading(false)
        setSavePopup(false) 
    }

    //set servings
    const servingHandeler = e => {
        setSavePopup(true)
        var index = e.target.name
        var variant = e.target.id

        if (variant == 'breakfast') {
            var temp = [...breakfastServings]
            temp[index] = e.target.value
            setBreakfastServings(temp)
        }
        if (variant == 'lunch') {
            var temp = [...lunchServings]
            temp[index] = e.target.value
            setLunchServings(temp)
        }
        if (variant == 'dinner') {
            var temp = [...dinnerServings]
            temp[index] = e.target.value
            setDinnerServings(temp)
        }
        if (variant == 'snack1') {
            var temp = [...snack1Servings]
            temp[index] = e.target.value
            setSnack1Servings(temp)
        }
        if (variant == 'snack2') {
            var temp = [...snack2Servings]
            temp[index] = e.target.value
            setSnack2Servings(temp)
        }
    }

    const [generated, setGenerated] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const planMeal = async () => {

        setAlertOpen(false)
        setSuccessOpen(false)
        setLoading(true)

        setRecipes([])

        if(curId != 'null' && curId){
            var meals = await fetcher(`/api/getFavoritedRecipes?id=${curId}`, false)
            meals.forEach(recipe => setRecipes(recipes => [...recipes, recipe.hits]))
        }

        if (calories > 500) {
            var meals = await fetcher(`/api/plan?calories=${calories}&snacking=${checked}&diet=${diet}`, false)

            if(meals.message){
                setSuccessOpen(true)
                setLoading(false)
                 return
            }
            if (!meals.breakfast.hits[0] || !meals.breakfast.hits[0].recipe || !meals.lunch.hits[0] || !meals.lunch.hits[0].recipe || !meals.dinner.hits[0] || !meals.dinner.hits[0].recipe) {
                setSuccessOpen(true)
                setLoading(false)
                return
            }
            if (checked) {
                if (!meals.snack1.hits[0] || !meals.snack1.hits[0].recipe || !meals.snack2.hits[0] || !meals.snack2.hits[0].recipe) {
                    setSuccessOpen(true)
                    setLoading(false)
                    return
                }
            }

            var newBreakfast = meals.breakfast.hits[Math.round(Math.random() * meals.breakfast.hits.length - 1)]
            setBreakfast([newBreakfast])
            setBreakfastServings([Math.round(calorieChart.breakfast / newBreakfast.recipe.calories * 100) / 100])

            var newLunch = meals.lunch.hits[Math.round(Math.random() * meals.lunch.hits.length - 1)]
            setLunch([newLunch])
            setLunchServings([Math.round(calorieChart.lunch / newLunch.recipe.calories * 100) / 100])

            var newDinner = meals.dinner.hits[Math.round(Math.random() * meals.dinner.hits.length - 1)]
            setDinner([newDinner])
            setDinnerServings([Math.round(calorieChart.dinner / newDinner.recipe.calories * 100) / 100])

            if (checked) {
                setSnack1([meals.snack1.hits[Math.round(Math.random() * meals.snack1.hits.length - 1)]])
                setSnack2([meals.snack2.hits[Math.round(Math.random() * meals.snack2.hits.length - 1)]])
            }
            setLoading(false)
            setAlertOpen(true)
            setGenerated(true)
            setSavePopup(true)
        } else {
            setSuccessOpen(true)
        }
    }

    //handle the modal

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [breakfastChecked, setBreakfastChecked] = useState(false);
    const [snack1Checked, setSnack1Checked] = useState(false);
    const [lunchChecked, setLunchChecked] = useState(false);
    const [snack2Checked, setSnack2Checked] = useState(false);
    const [dinnerChecked, setDinnerChecked] = useState(false);

    const handleModalChange = (event) => {

        if (event.target.id == "breakfast") {
            setBreakfastChecked(event.target.checked)
        }
        if (event.target.id == "snack1") {
            setSnack1Checked(event.target.checked)
        }
        if (event.target.id == "lunch") {
            setLunchChecked(event.target.checked)
        }
        if (event.target.id == "snack2") {
            setSnack2Checked(event.target.checked)
        }
        if (event.target.id == "dinner") {
            setDinnerChecked(event.target.checked)
        }
    };

    const handleModalDone = (event) => {

        var tempSelected = selectedRecipe
        tempSelected.isAdded = true
        setSelectedRecipe(tempSelected)

        if (breakfastChecked) {
            var temp = [...breakfast]
            temp.push(selectedRecipe)
            setBreakfast(temp)

            var servingsTemp = [...breakfastServings]
            servingsTemp.push(1)
            setBreakfastServings(servingsTemp)
        }
        if (snack1Checked) {
            var temp = [...snack1]
            temp.push(selectedRecipe)
            setSnack1(temp)

            var servingsTemp = [...snack1Servings]
            servingsTemp.push(1)
            setSnack1Servings(servingsTemp)
        }
        if (lunchChecked) {
            var temp = [...lunch]
            temp.push(selectedRecipe)
            setLunch(temp)

            var servingsTemp = [...lunchServings]
            servingsTemp.push(1)
            setLunchServings(servingsTemp)
        }
        if (snack2Checked) {
            var temp = [...snack2]
            temp.push(selectedRecipe)
            setSnack2(temp)

            var servingsTemp = [...snack2Servings]
            servingsTemp.push(1)
            setSnack2Servings(servingsTemp)
        }
        if (dinnerChecked) {
            var temp = [...dinner]
            temp.push(selectedRecipe)
            setDinner(temp)

            var servingsTemp = [...dinnerServings]
            servingsTemp.push(1)
            setDinnerServings(servingsTemp)
        }

        setSnack1Checked(false)
        setSnack2Checked(false)
        setBreakfastChecked(false)
        setLunchChecked(false)
        setDinnerChecked(false)
        setSavePopup(true)

        handleClose()
    };

    //backdrop
    const [openBackdrop, setBackdrop] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    return (<main className={styles.main}>
        <ThemeProvider theme={lightTheme}>
            <DrawerAppBar id={curId}/>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    width: 'calc(100% - 440px)',
                    height: 'fit-content',
                    margin: '2.5vh',
                    marginTop: '0',
                    padding: '2.5vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography variant='h3' sx={{ marginBottom: 'auto', paddingBottom: '5vh', paddingTop: '6rem' }}>
                        What is your diet?
                    </Typography>
                    <Typography variant='subtitle1' sx={{ marginBottom: 'auto', width: '60%', textAlign: 'center', paddingBottom: '5vh' }}>
                        Bulkinator creates personalized meal plans based on your caloric needs. Reach your diet and nutritional goals and create your meal plan right here in seconds.
                    </Typography>
                    <div style={{
                        width: '80%',
                        height: 'fit-content',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: '15px'
                    }}>
                        <ToggleButtonGroup {...control} size="large" aria-label="large button group" >
                            <ToggleButton value="">Default <Fastfood sx={{ marginleft: '5px' }}></Fastfood></ToggleButton>
                            <ToggleButton value="vegan">Vegan<GrassOutlined sx={{ marginleft: '5px' }}></GrassOutlined></ToggleButton>
                            <ToggleButton value="vegetarian">Vegetarian<Egg sx={{ marginleft: '5px' }}></Egg></ToggleButton>
                            <ToggleButton value="paleo">Natural<NoFood sx={{ marginleft: '5px' }}></NoFood></ToggleButton>
                        </ToggleButtonGroup >
                    </div>
                    <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'fit-content', padding: '15px' }}>
                        <Box sx={{ width: '100%' }}>
                            <Collapse in={successOpen}>
                                <Alert
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setSuccessOpen(false);
                                            }}
                                        >
                                            <Close fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    Error
                                </Alert>
                            </Collapse>
                            <Collapse in={alertOpen}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setAlertOpen(false);
                                            }}
                                        >
                                            <Close fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    Success!
                                </Alert>
                            </Collapse>
                        </Box>
                        <div style={{
                            width: '80%',
                            height: 'fit-content',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: '15px'
                        }}>
                            <TextField
                                id="outlined-number"
                                label="Cals"
                                type="number"
                                variant="outlined"
                                onChange={handler}
                                value={calories}
                                sx={{ width: '25%' }}
                            />
                            <FormControlLabel control={<Checkbox defaultChecked checked={checked} onChange={snackingChange} inputProps={{ 'aria-label': 'controlled' }} />} label="Include Snacking" sx={{ marginLeft: '10px' }} />
                        </div>
                        <Button size='large' sx={{ marginTop: 'auto' }} onClick={planMeal}>
                            {isLoading ? <HourglassEmpty className={styles.loadingIcon}></HourglassEmpty> : "Generate"}
                        </Button>
                    </Paper>
                </div>
            </div>
            {generated ?
                <div style={{
                    width: '95vw',
                    margin: '1vw',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        width: 'fit-content',
                        margin: '1vw',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}>
                        <Typography color="text.secondary" variant="h4" component="h4">
                            Meal Plan
                        </Typography>
                        <Paper sx={{ width: '50vw', height: 'fit-content', padding: '2vh', marginTop: '10px' }}>
                            <Typography variant="h6" component="h3">
                                Breakfast
                            </Typography>
                            <Typography variant="subtitle1" component="subtitle1">
                                {breakfastServings[1] && breakfastServings[0] ? Math.round(breakfastServings.reduce((accumulator, cur, i) => parseInt(i == 1 ? accumulator * breakfast[0].recipe.calories : accumulator) + cur * breakfast[i].recipe.calories)) : breakfastServings[0] ? Math.round(breakfastServings[0] * breakfast[0].recipe.calories) : breakfast[0] ? Math.round(calorieChart.breakfast) : 0} {" Calories"}
                            </Typography>

                            {breakfast.length >= 0 ? breakfast.map((curMeal, index) => (
                                <>
                                    <Paper className={styles.meal_component} sx={{  height: '15vh', padding: '2vh', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <img
                                            srcSet={curMeal.recipe.image}
                                            src={curMeal.recipe.image}
                                            alt={'food'}
                                            style={{
                                                width: '8vh',
                                                height: '8vh',
                                                borderRadius: '10px'
                                            }}
                                            onClick={() => {
                                                window.open(`./meals/${encodeURIComponent(curMeal._links.self.href)}?id=${curId}`)
                                            }}
                                            loading="lazy"
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                            <Typography variant="h6" component="subtitle1" fontSize={16}>
                                                {curMeal.recipe.label}
                                            </Typography>
                                            <TextField
                                                id="breakfast"
                                                label="Serving"
                                                type="number"
                                                size='small'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                                name={index}
                                                onChange={servingHandeler}
                                                defaultValue={curMeal.savedPlan ? breakfastServings[index] : curMeal.isAdded ? 1 : Math.round(calorieChart.breakfast / curMeal.recipe.calories * 100) / 100}
                                            />
                                        </div>
                                        <Tooltip title="Completed">
                                            <Checkbox sx={{marginLeft:'auto'}} color="success" checked={curMeal.checked} onChange={() => {
                                                if(breakfast[index].checked){
                                                    var temp = [...breakfast]
                                                    temp[index].checked = false
                                                    setBreakfast(temp)
                                                } else {
                                                    var temp = [...breakfast]
                                                    temp[index].checked = true
                                                    setBreakfast(temp)
                                                }
                                                setSavePopup(true)
                                            }}/>
                                        </Tooltip>
                                        
                                        <Delete className={styles.deleteIcon} sx={{ marginLeft: '10px' }} onClick={() => {
                                            var temp = [...breakfast]
                                            temp.splice(index, 1);
                                            setBreakfast(temp)

                                            var tempServings = [...breakfastServings]
                                            tempServings.splice(index, 1);
                                            setBreakfastServings(tempServings)
                                            setSavePopup(true)
                                        }}></Delete>
                                    </Paper>
                                </>
                            )) : <></>}
                        </Paper>
                        {checked ? <Paper sx={{ width: '50vw', height: 'fit-content', padding: '2vh', marginTop: '10px' }}>
                            <Typography variant="h6" component="h3">
                                Snack 1
                            </Typography>
                            <Typography variant="subtitle1" component="subtitle1">
                                {snack1Servings[1] && snack1Servings[0] ? Math.round(snack1Servings.reduce((accumulator, cur, i) => parseInt(i == 1 ? accumulator * snack1[0].recipe.calories : accumulator) + cur * snack1[i].recipe.calories)) : snack1Servings[0] ? Math.round(snack1Servings[0] * snack1[0].recipe.calories) : snack1[0] ? Math.round(calorieChart.snack1) : 0} {" Calories"}
                            </Typography>

                            {snack1.length >= 0 ? snack1.map((curMeal, index) => (
                                <>
                                    <Paper className={styles.meal_component} sx={{ height: '15vh', padding: '2vh', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <img
                                            srcSet={curMeal.recipe.image}
                                            src={curMeal.recipe.image}
                                            alt={'food'}
                                            style={{
                                                width: '8vh',
                                                height: '8vh',
                                                borderRadius: '10px'
                                            }}
                                            onClick={() => {
                                                window.open(`./meals/${encodeURIComponent(curMeal._links.self.href)}?id=${curId}`)
                                            }}
                                            loading="lazy"
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                            <Typography variant="h6" component="subtitle1" fontSize={16}>
                                                {curMeal.recipe.label}
                                            </Typography>
                                            <TextField
                                                id="snack1"
                                                label="Serving"
                                                type="number"
                                                size='small'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                                name={index}
                                                onChange={servingHandeler}
                                                defaultValue={curMeal.savedPlan ? snack1Servings[index] :curMeal.isAdded ? 1 : Math.round(calorieChart.snack1 / curMeal.recipe.calories * 100) / 100}
                                            />
                                        </div>
                                        <Tooltip title="Completed">
                                        <Checkbox sx={{marginLeft:'auto'}} color="success" checked={curMeal.checked} onChange={() => {
                                            if(snack1[index].checked){
                                                var temp = [...snack1]
                                                temp[index].checked = false
                                                setSnack1(temp)
                                            } else {
                                                var temp = [...snack1]
                                                temp[index].checked = true
                                                setSnack1(temp)
                                            }
                                            setSavePopup(true)
                                        }}/>
                                        </Tooltip>
                                        <Delete className={styles.deleteIcon} sx={{ marginLeft: '10px' }} onClick={() => {
                                            var temp = [...snack1]
                                            temp.splice(index, 1);
                                            setSnack1(temp)

                                            var tempServings = [...snack1Servings]
                                            tempServings.splice(index, 1);
                                            setSnack1Servings(tempServings)
                                            setSavePopup(true)
                                        }}></Delete>
                                    </Paper>
                                </>
                            )) : <></>}
                        </Paper> : <></>}
                        <Paper sx={{ width: '50vw', height: 'fit-content', padding: '2vh', marginTop: '10px' }}>
                            <Typography variant="h6" component="h3">
                                Lunch
                            </Typography>
                            <Typography variant="subtitle1" component="subtitle1">
                                {lunchServings[1] && lunchServings[0] ? Math.round(lunchServings.reduce((accumulator, cur, i) => parseInt(i == 1 ? accumulator * lunch[0].recipe.calories : accumulator) + cur * lunch[i].recipe.calories)) : lunchServings[0] ? Math.round(lunchServings[0] * lunch[0].recipe.calories) : lunch[0] ? Math.round(calorieChart.lunch) : 0} {" Calories"}
                            </Typography>

                            {lunch.length >= 0 ? lunch.map((curMeal, index) => (
                                <>
                                    <Paper className={styles.meal_component} sx={{ height: '15vh', padding: '2vh', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <img
                                            srcSet={curMeal.recipe.image}
                                            src={curMeal.recipe.image}
                                            alt={'food'}
                                            style={{
                                                width: '8vh',
                                                height: '8vh',
                                                borderRadius: '10px'
                                            }}
                                            onClick={() => {
                                                window.open(`./meals/${encodeURIComponent(curMeal._links.self.href)}?id=${curId}`)
                                            }}
                                            loading="lazy"
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                            <Typography variant="h6" component="subtitle1" fontSize={16}>
                                                {curMeal.recipe.label}
                                            </Typography>
                                            <TextField
                                                id="lunch"
                                                label="Serving"
                                                type="number"
                                                size='small'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                                name={index}
                                                onChange={servingHandeler}
                                                defaultValue={curMeal.savedPlan ? lunchServings[index] :curMeal.isAdded ? 1 : Math.round(calorieChart.lunch / curMeal.recipe.calories * 100) / 100}
                                            />
                                        </div>
                                        <Tooltip title="Completed">
                                        <Checkbox sx={{marginLeft:'auto'}} color="success" checked={curMeal.checked} onChange={() => {
                                            if(lunch[index].checked){
                                                var temp = [...lunch]
                                                temp[index].checked = false
                                                setLunch(temp)
                                            } else {
                                                var temp = [...lunch]
                                                temp[index].checked = true
                                                setLunch(temp)
                                            }
                                            setSavePopup(true)
                                        }}/>
                                        </Tooltip>
                                        <Delete className={styles.deleteIcon} sx={{ marginLeft: '10px' }} onClick={() => {
                                            setSavePopup(true)
                                            var temp = [...lunch]
                                            temp.splice(index, 1);
                                            setLunch(temp)

                                            var tempServings = [...lunchServings]
                                            tempServings.splice(index, 1);
                                            setLunchServings(tempServings)
                                        }}></Delete>
                                    </Paper>
                                </>
                            )) : <></>}
                        </Paper>
                        {checked ? <Paper sx={{ width: '50vw', height: 'fit-content', padding: '2vh', marginTop: '10px' }}>
                            <Typography variant="h6" component="h3">
                                Snack 2
                            </Typography>
                            <Typography variant="subtitle1" component="subtitle1">
                                {snack2Servings[1] && snack2Servings[0] ? Math.round(snack2Servings.reduce((accumulator, cur, i) => parseInt(i == 1 ? accumulator * snack2[0].recipe.calories : accumulator) + cur * snack2[i].recipe.calories)) : snack2Servings[0] ? Math.round(snack2Servings[0] * snack2[0].recipe.calories) : snack2[0] ? Math.round(calorieChart.snack2) : 0} {" Calories"}
                            </Typography>

                            {snack2.length >= 0 ? snack2.map((curMeal, index) => (
                                <>
                                    <Paper className={styles.meal_component} sx={{ height: '15vh', padding: '2vh', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <img
                                            srcSet={curMeal.recipe.image}
                                            src={curMeal.recipe.image}
                                            alt={'food'}
                                            style={{
                                                width: '8vh',
                                                height: '8vh',
                                                borderRadius: '10px'
                                            }}
                                            onClick={() => {
                                                window.open(`./meals/${encodeURIComponent(curMeal._links.self.href)}?id=${curId}`)
                                            }}
                                            loading="lazy"
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                            <Typography variant="h6" component="subtitle1" fontSize={16}>
                                                {curMeal.recipe.label}
                                            </Typography>
                                            <TextField
                                                id="snack2"
                                                label="Serving"
                                                type="number"
                                                size='small'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                                name={index}
                                                onChange={servingHandeler}
                                                defaultValue={curMeal.savedPlan ? snack2Servings[index] :curMeal.isAdded ? 1 : Math.round(calorieChart.snack2 / curMeal.recipe.calories * 100) / 100}
                                            />
                                        </div>
                                        <Tooltip title="Completed">
                                        <Checkbox sx={{marginLeft:'auto'}} color="success" checked={curMeal.checked} onChange={() => {
                                            if(snack2[index].checked){
                                                var temp = [...snack2]
                                                temp[index].checked = false
                                                setSnack2(temp)
                                            } else {
                                                var temp = [...snack2]
                                                temp[index].checked = true
                                                setSnack2(temp)
                                            }
                                            setSavePopup(true)
                                        }}/>
                                        </Tooltip>
                                        <Delete className={styles.deleteIcon} sx={{ marginLeft: '10px' }} onClick={() => {
                                            var temp = [...snack2]
                                            temp.splice(index, 1);
                                            setSnack2(temp)

                                            var tempServings = [...snack2Servings]
                                            tempServings.splice(index, 1);
                                            setSnack2Servings(tempServings)
                                            setSavePopup(true)
                                        }}></Delete>
                                    </Paper>
                                </>
                            )) : <></>}
                        </Paper> : <></>}
                        <Paper sx={{ width: '50vw', marginBottom: '6rem', height: 'fit-content', padding: '2vh', marginTop: '10px' }}>
                            <Typography variant="h6" component="h3">
                                Dinner
                            </Typography>
                            <Typography variant="subtitle1" component="subtitle1">
                                {dinnerServings[1] && dinnerServings[0] ? Math.round(dinnerServings.reduce((accumulator, cur, i) => parseInt(i == 1 ? accumulator * dinner[0].recipe.calories : accumulator) + cur * dinner[i].recipe.calories)) : dinnerServings[0] ? Math.round(dinnerServings[0] * dinner[0].recipe.calories) : dinner[0] ? Math.round(calorieChart.dinner) : 0} {" Calories"}
                            </Typography>

                            {dinner.length >= 0 ? dinner.map((curMeal, index) => (
                                <>
                                    <Paper className={styles.meal_component} sx={{ height: '15vh', padding: '2vh', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <img
                                            srcSet={curMeal.recipe.image}
                                            src={curMeal.recipe.image}
                                            onClick={() => {
                                                window.open(`./meals/${encodeURIComponent(curMeal._links.self.href)}?id=${curId}`)
                                            }}
                                            alt={'food'}
                                            style={{
                                                width: '8vh',
                                                height: '8vh',
                                                borderRadius: '10px'
                                            }}
                                            loading="lazy"
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                            <Typography variant="h6" component="subtitle1" fontSize={16}>
                                                {curMeal.recipe.label}
                                            </Typography>
                                            <TextField
                                                id="dinner"
                                                label="Serving"
                                                type="number"
                                                size='small'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                                name={index}
                                                onChange={servingHandeler}
                                                defaultValue={curMeal.savedPlan ? dinnerServings[index] : curMeal.isAdded ? 1 : Math.round(calorieChart.dinner / curMeal.recipe.calories * 100) / 100}
                                            />
                                        </div>
                                        <Tooltip title="Completed">
                                        <Checkbox sx={{marginLeft:'auto'}} color="success" checked={curMeal.checked} onChange={() => {
                                            if(dinner[index].checked){
                                                var temp = [...dinner]
                                                temp[index].checked = false
                                                setDinner(temp)
                                            } else {
                                                var temp = [...dinner]
                                                temp[index].checked = true
                                                setDinner(temp)
                                            }
                                            setSavePopup(true)
                                        }}/>
                                        </Tooltip>
                                        <Delete className={styles.deleteIcon} sx={{ marginLeft: '10px' }} onClick={() => {
                                            var temp = [...dinner]
                                            temp.splice(index, 1);
                                            setDinner(temp)

                                            var tempServings = [...dinnerServings]
                                            tempServings.splice(index, 1);
                                            setDinnerServings(tempServings)
                                            setSavePopup(true)
                                        }}></Delete>
                                    </Paper>
                                </>
                            )) : <></>}
                        </Paper>
                    </div>
                    <div className={styles.recipes_container}>
                        {curId != "null" && recipes[0] ? <>
                        <Typography color="text.secondary" variant="h4" component="h4">
                            Saved Meals
                        </Typography>
                        <Paper sx={{ padding: '2vh', marginTop: '10px' }}>
                            <ImageList sx={{ width: 400, height: 'fit-content', maxHeight: '75vh', margin: 0, marginLeft: 'auto' }} cols={3} rowHeight={164}>
                                {recipes && recipes.length >= 0 ? recipes.map((recipeList, i) => (
                                    <>
                                        {recipeList.map((curRecipe, k) => (
                                            <ImageListItem key={curRecipe.recipe.image} className={styles.recipe_card}>
                                                <img
                                                    srcSet={`${curRecipe.recipe.image}`}
                                                    src={`${curRecipe.recipe.image}`}
                                                    alt={curRecipe.recipe.label}
                                                    loading="lazy"
                                                    onClick={() => {
                                                        handleOpen()
                                                        setSelectedRecipe(curRecipe)
                                                    }}
                                                />
                                            </ImageListItem>))}
                                    </>
                                )) : <></>}
                            </ImageList>
                        </Paper></> : <></>}
                    </div>
                </div> : <></>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add to meal:
                    </Typography>
                    <FormGroup sx={{ mt: 2 }}>
                        <FormControlLabel control={<Checkbox id="breakfast" checked={breakfastChecked} onChange={handleModalChange} />} label="Breakfast" />
                        {checked ? <FormControlLabel control={<Checkbox id="snack1" checked={snack1Checked} onChange={handleModalChange} />} label="Snack 1" /> : <FormControlLabel disabled control={<Checkbox id="snack1" checked={snack1Checked} onChange={handleModalChange} />} label="Snack 1" />}
                        <FormControlLabel control={<Checkbox id="lunch" checked={lunchChecked} onChange={handleModalChange} />} label="Lunch" />
                        {checked ? <FormControlLabel control={<Checkbox id="snack2" checked={snack2Checked} onChange={handleModalChange} />} label="Snack 2" /> : <FormControlLabel disabled control={<Checkbox id="snack2" checked={snack2Checked} onChange={handleModalChange} />} label="Snack 2" />}
                        <FormControlLabel control={<Checkbox id="dinner" checked={dinnerChecked} onChange={handleModalChange} />} label="Dinner" />
                        <Button onClick={handleModalDone}>Done</Button>
                    </FormGroup>
                </Box>
            </Modal>
            <Snackbar sx={{right: '20px !important', left: 'auto !important'}} open={savePopup} autoHideDuration={6000}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }} action={<>
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={curId != "null" ? save : () => location.href="/login"}
                                            >
                                                {saveLoading ? <CircularProgress size="1rem"/>: <Check fontSize="inherit" />}
                                            </IconButton>
                                            <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={()=>setSavePopup(false)}
                                        >
                                            <Close fontSize="inherit" />
                                        </IconButton>
                                        </>
                                        }>
                    Do you want to save your changes?
                </Alert>
            </Snackbar>
            
        </ThemeProvider>
    </main>)
}
