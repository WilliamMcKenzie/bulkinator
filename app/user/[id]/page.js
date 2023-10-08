// 'use client'
// import styles from 'app:'
// import cn from "classnames";
// import { config } from '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/fontawesome-svg-core/styles.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// config.autoAddCss = false

// import { faArrowsRotate, faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
// import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
// import { useEffect, useRef, useState } from 'react'
// import axios from 'axios'

// import EnhancedTable from '../components/EnhancedTable'
// import DrawerAppBar from '../components/Navbar'

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

// //recipe cards 
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import AddIcon from '@mui/icons-material/Add';

// const fetcher = (url, data) => {
//     return axios.get(url, data).then(res => res.data);
// };

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     ArcElement,
//     Title,
//     Legend,
//     BarElement,
// } from 'chart.js';
// import { Bar, Line, Doughnut } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';
// import { ThemeProvider, createMuiTheme } from '@mui/material';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     BarElement,
//     ArcElement,
//     Title,
//     Legend
// );

// const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             display: false,
//             position: 'top',
//         },
//         title: {
//             display: true,
//             text: 'Weight over time (lbs)',
//         },
//     },
// };

// var labels = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August',];
// const labels2 = ['12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];

// const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Weight (2023)',
//             data: labels.map(() => faker.datatype.number({ min: 100, max: 200 })),
//             borderColor: 'rgb(255, 115, 0)',
//             backgroundColor: 'rgba(255, 115, 0, 0.5)',
//         },
//     ],
// };

// labels = ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];

// const data2 = {
//     labels,
//     datasets: [
//         {
//             label: 'Pan Roast Chicken For One',
//             data: [0, 871, 0, 0, 0, 0, 0],
//             borderColor: 'rgb(255, 115, 0)',
//             backgroundColor: 'rgba(255, 115, 0, 0.5)',
//         },
//         {
//             label: 'Rat City Chili',
//             data: [0, 0, 0, 0, 1433, 0, 0],
//             borderColor: '#BEE7B8',
//             backgroundColor: '#BEE7B8',
//         },
//     ],
// };

// const donutData = {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [
//         {
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)',
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)',
//             ],
//             borderWidth: 1,
//         },
//     ],
// };


// const timeChart = {
//     plugins: {
//         legend: {
//             display: true,
//             position: 'top',
//         },
//         title: {
//             display: true,
//             text: 'Todays Diet',
//         },
//     },
//     scales: {
//         x: {
//             stacked: true,
//         },
//         y: {
//             stacked: true
//         }
//     }
// };

// const dailyMealsConfig = {
//     responsive: true,
//     plugins: {
//         legend: {
//             display: false,
//             position: 'top',
//         },
//         title: {
//             display: true,
//             text: 'Todays Meals',
//         },
//     },
// };


// export default function Home() {

//     //theme
//     const lightTheme = createMuiTheme({
//         palette: {
//             type: "light",
//             primary: {
//                 light: "#ff9d4d",
//                 main: "#2196f3",
//                 dark: "#b35000"
//             }
//         }
//     });

//     const weightsEndRef = useRef()
//     const [recipes, setRecipes] = useState([]);

//     const [recipeListClass, setRecipeListClass] = useState(cn(styles.recipes_list))
//     const [headerClass, setHeaderClass] = useState(cn(styles.meals_header, styles.meals_header_contain_view))

//     useEffect(() => {
//         setRecipeListClass(cn(styles.recipes_list, styles.recipes_list_full_view))
//         setHeaderClass(cn(styles.meals_header, styles.meals_header_contain_view))
//         // const observer = new IntersectionObserver((entries, observer) => {
//         //     const entry = entries[0];
//         //     if (entry.isIntersecting) {
//         //         setRecipeListClass(cn(styles.recipes_list))
//         //         setHeaderClass(cn(styles.meals_header))
//         //     }
//         //     else {
//         //         setRecipeListClass(cn(styles.recipes_list, styles.recipes_list_full_view))
//         //         setHeaderClass(cn(styles.meals_header, styles.meals_header_contain_view))
//         //     }
//         // });
//         // observer.observe(recipeRef.current);
//     }, []);

//     useEffect(() => {
//         var meals

//         setRecipes([])

//         async function init() {
//             meals = await fetcher(`/api/getFavoritedRecipes?id=64f7aec6d557116bbb8a6ca4`, false)
//             meals.forEach(recipe => setRecipes(recipes => [...recipes, recipe.hits]))
//             scrollTo(weightsEndRef)
//         }

//         init()
//     }, [])




//     return (<main className={styles.main}>
//         <ThemeProvider theme={lightTheme}>
//             <DrawerAppBar />
//             <div style={{ display: 'flex' }}>
//                 <div className={styles.recipes_container}>
//                     <div className={recipeListClass}>
//                         {recipes && recipes.length >= 0 ? recipes.map((recipeList, index) => (

//                             <div className={styles.recipe_chunk} key={index} id={index.toString()}>
//                                 {recipeList.map((curRecipe, index) => (
//                                     <Card key={index} className={styles.recipe_card} sx={{ maxWidth: 200, marginTop: '0 !important' }}>
//                                         <CardMedia
//                                             component="img"
//                                             height="194"
//                                             image={curRecipe.recipe.image}
//                                             alt="Paella dish"
//                                             onClick={() => {
//                                                 window.open(`/meals/${encodeURIComponent(curRecipe._links.self.href)}`)
//                                             }}
//                                         />
//                                         <CardContent>
//                                             <Typography variant="body2" color="text.secondary">
//                                                 {(Math.round(parseInt(curRecipe.recipe.calories))) + " calories & " + (Math.round(parseInt(curRecipe.recipe.totalNutrients.PROCNT.quantity))) + "g of protein"}
//                                             </Typography>
//                                         </CardContent>
//                                         <CardActions disableSpacing>
//                                             <IconButton aria-label="add">
//                                                 <AddIcon />
//                                             </IconButton>
//                                         </CardActions>
//                                     </Card>
//                                 ))}
//                                 <div />
//                             </div>

//                         )) : <h1>You have not liked any meals!</h1>}
//                     </div>
//                 </div>
//                 <Card style={{
//                     width: 'calc(100% - 440px)',
//                     height: '50vh',
//                     margin: '2.5vh',
//                     marginTop: '0',
//                     padding: '2.5vh',
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     justifyContent: 'center'
//                 }}>
//                     <Bar options={timeChart} data={data2} />
//                 </Card>
//             </div>
//             <div style={{
//                 width: '97vw',
//                 margin: '1vw',
//                 display: 'flex',
//                 alignItems: 'flex-start',
//                 justifyContent: 'center'
//             }}>
//                 <EnhancedTable />
//             </div>
//         </ThemeProvider>
//     </main>)

//     // return (
//     //     <main className={styles.main}>
//     //         <div className={styles.navbar}>
//     //             <a className={styles.logo_container} href='./'>
//     //                 <img src="data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7"></img>
//     //             </a>
//     //             <div className={styles.navbar_container}>
//     //                 <a href="./">
//     //                     Home
//     //                 </a>
//     //                 <a href="./meals">
//     //                     Search
//     //                 </a>
//     //                 <a href="./meals">
//     //                     Sign Out
//     //                 </a>
//     //             </div>
//     //         </div>

//     //         <div className={styles.meals_background}></div>
//     //         <div className={headerClass}>
//     //             <div className={styles.meals_header_background}></div>
//     //             <h1>What are you trying to do?</h1>
//     //             <div className={styles.meals_input}>
//     //                 <button onClick={console.log(recipes)}>Bulk</button>
//     //                 <button>Cut</button>
//     //             </div>
//     //         </div>
//     //         <h1 className={styles.header}>Bulk Day 120</h1>
//     //         <div className={styles.meal_planner_section}>
//     //             <div className={styles.meal_planner_container}>
//     //                 <div className={styles.meal_planner_info}>
//     //                     <div className={styles.meal_list_container}>
//     //                         <h1>Added Meals</h1>
//     //                         <ul className={styles.meal_list}>
//     //                             <li><div>Pasta<p contentEditable={true}>20:21</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                             <li><div>Pasta<p contentEditable={true}>20:21</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                             <li><div>Pasta<p contentEditable={true}>20:21</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                             <li><div>Pasta<p contentEditable={true}>20:21</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                             <li><div>Pasta<p contentEditable={true}>20:21</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                             <li><div>Pasta<p contentEditable={true}>20:21</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                             <li><div>Pasta<p contentEditable={true}>20:21</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                             <div>
//     //                             </div>
//     //                         </ul>
//     //                     </div>
//     //                 </div>
//     //                 <div className={styles.meal_planner_chart}>
//     //                     <Bar options={timeChart} data={data2} />
//     //                     {/* <Doughnut data={donutData}></Doughnut> */}
//     //                 </div>
//     //             </div>
//     //             <div className={styles.recipes_container}>
//     //                 <div className={recipeListClass}>
//     //                     {recipes && recipes.length >= 0 ? recipes.map((recipeList, index) => (

//     //                         <div className={styles.recipe_chunk} key={index} id={index.toString()}>
//     //                             {recipeList.map((curRecipe, index) => (
//     //                                 <div key={index} className={styles.recipe_card}>
//     //                                     <img src={curRecipe.recipe.image} onClick={() => {
//     //                                         window.open(`/meals/${encodeURIComponent(curRecipe._links.self.href)}`)
//     //                                     }}></img>
//     //                                     <FontAwesomeIcon icon={faPlus} className={styles.bookmarkIcon} onClick={async () => {
//     //                                         console.log(recipes)
//     //                                     }}></FontAwesomeIcon>

//     //                                     <div className={styles.recipe_card_info}>
//     //                                         <label>{curRecipe.recipe.dishType ? ((curRecipe.recipe.dishType).toString()).toUpperCase() : ""}</label>
//     //                                         {(Math.round(parseInt(curRecipe.recipe.calories))) + " calories & " + (Math.round(parseInt(curRecipe.recipe.totalNutrients.PROCNT.quantity))) + "g of protein"}
//     //                                     </div>
//     //                                 </div>
//     //                             ))}
//     //                             <div />
//     //                         </div>

//     //                     )) : <h1>You have not liked any meals!</h1>}
//     //                 </div>
//     //             </div>
//     //         </div>

//     //         <div className={styles.weight_tracker_section}>
//     //             <div className={styles.weight_tracker_statistics}>
//     //                 <div className={styles.weight_tracker_header}>
//     //                 </div>
//     //                 <div className={styles.weight_list_container}>
//     //                     <h1>Added Weights</h1>
//     //                     <ul className={styles.weight_list}>
//     //                         <li><div>January 1st: <p contentEditable={true}>20</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                         <li><div>January 1st: <p contentEditable={true}>20</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                         <li><div>January 1st: <p contentEditable={true}>20</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                         <li><div>January 1st: <p contentEditable={true}>20</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                         <li><div>January 1st: <p contentEditable={true}>20</p></div> <FontAwesomeIcon icon={faTrashCan} className={styles.deleteIcon} /></li>
//     //                         <div ref={weightsEndRef}>
//     //                         </div>
//     //                     </ul>
//     //                     <p className={styles.weight_list_input}><input placeholder='Weight (lbs)'></input> <FontAwesomeIcon icon={faPlus} className={styles.addIcon} /> <FontAwesomeIcon icon={faFloppyDisk} className={styles.saveIcon} /></p>
//     //                 </div>
//     //                 <div className={styles.weight_graph}>
//     //                     <Line options={timeChart} data={data} />
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     </main >
//     // )
// }


export default function Home(){
    return(<h1>
        suck it
    </h1>)
}