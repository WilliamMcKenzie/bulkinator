import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'
import { resolve } from 'path/posix'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const totalCals = parseInt(searchParams.get('calories'))
    const snacking = searchParams.get('snacking')
    const diet = searchParams.get('diet')

    const apiKey = '4487c73d45a1038e4bb07fbb970f535d';
    const appId = '35545a91';

    var calorieChart = {breakfast:0, lunch: 0, dinner: 0, snack1: 0, snack2: 0}

    if(snacking == "true"){
        var cals = [totalCals/3, totalCals/1.5]
        calorieChart = {breakfast: cals[1]/3, snack1: cals[0]/2, lunch: cals[1]/3, snack2: cals[0]/2, dinner: cals[1]/3}
    } else {
        var cals = [totalCals]
        calorieChart = {breakfast: cals[0]/3, lunch: cals[0]/3, dinner: cals[0]/3, snack1: 0, snack2: 0}
    }

    var i =0
    var res = {breakfast:{}, lunch:{}, dinner:{}, snack1: {}, snack2: {}}

    var meats = ['steak', 'chicken', 'pork', 'fish', 'salmon']
    var lunchMeat = meats[Math.floor(Math.random()*meats.length)]
    var dinnerMeat = meats[Math.floor(Math.random()*meats.length)]

    const queryParams = {
        app_id: appId,
        app_key: apiKey,
        diet: 'high-protein'
    };

    const breakfast = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&calories=${Math.round(calorieChart.breakfast-50)}-${Math.round(calorieChart.breakfast+50)}&q=${diet=="vegan" ? "banana" : "egg"}&${diet != "" ? `health=${diet}` : ""}`, {
        params: queryParams
    });
 
    const lunch = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&calories=${Math.round(calorieChart.lunch-50)}-${Math.round(calorieChart.lunch+50)}&q=${diet=="vegan" || diet == "vegetarian" ? "potato" : lunchMeat}&${diet != "" ? `health=${diet}` : ""}`, {
        params: queryParams
    });

    const dinner = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&calories=${Math.round(calorieChart.dinner-50)}-${Math.round(calorieChart.dinner+50)}&q=${diet=="vegan" || diet == "vegetarian" ? "rice" : dinnerMeat}&${diet != "" ? `health=${diet}` : ""}`, {
        params: queryParams
    });

    breakfast.data.serving = breakfast.data.calories/calorieChart.breakfast
    res.breakfast = breakfast.data
    dinner.data.serving = dinner.data.calories/calorieChart.dinner
    res.dinner = dinner.data
    lunch.data.serving = lunch.data.calories/calorieChart.lunch
    res.lunch = lunch.data

    if(snacking == "true"){

        var snacks = ['cracker', 'peanut', 'apple', 'milkshake']
        var snacks1 = snacks[Math.floor(Math.random()*snacks.length)]
        var snacks2 = snacks[Math.floor(Math.random()*snacks.length)]

        const snack1 = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&calories=${Math.round(calorieChart.snack1-50)}-${Math.round(calorieChart.snack1+50)}&q=${snacks1}&${diet != "" ? `health=${diet}` : ""}`, {
            params: queryParams
        });

        const snack2 = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&calories=${Math.round(calorieChart.snack2-50)}-${Math.round(calorieChart.snack2+50)}&q=${snacks2}&${diet != "" ? `health=${diet}` : ""}`, {
            params: queryParams
        });
        
        res.snack1 = snack1.data
        res.snack2 = snack2.data
    }

    return NextResponse.json(res)
}