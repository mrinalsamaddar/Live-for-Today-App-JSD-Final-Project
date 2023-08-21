

/////////Live for Today App - JSD Final Project///////////////

//Global vaariables
const todaysWeatherContainer = document.querySelector('#weatherPanel');
const todaysnewsContainer = document.querySelector('#news');
const todaysRandomMealContainer = document.querySelector('#randomMeal');
const mealSearchButton = document.querySelector('#searchRecipeButton');
const triviaFormNode = document.querySelector('#triviaForm');
const adviseContainer = document.querySelector('#advise');

const recipeResultsContainer = document.querySelector('#searchRecipeResults');
const triviaResultsContainer = document.querySelector('#triviaSearchResults');
//const searchresultsContainer = document.querySelector('#searchResults');

//empty array for getting trivia results and passing into load results function
let triviaQuestions = {};

//get current weather API to the page
const getWeather = () => {

    const divTag = document.createElement('div');

    //ajax get equest
    axios.get('http://api.weatherapi.com/v1/current.json?key=7353215cc3224b59b4e74928231508&q=melbourne&aqi=no')
    .then( res => {
        divTag.innerHTML = `
        <span>Today : ${res.data.location.localtime}</span>
        <span>${res.data.location.name}</span>
        <span>Current Temperature : ${res.data.current.temp_c}</span>
        <span>Feels like : ${res.data.current.feelslike_c}</span>
        <span>Condition : ${res.data.current.condition.text}</span>
        <img src='https:${res.data.current.condition.icon}'> 
        
        `;

        todaysWeatherContainer.appendChild( divTag ); // putting into page

    })
    .catch( err => {
        console.log("Error loading weather info.",err);

    });

}; //getweather()

//Get current news API
const getNews = () => {

    const divTag = document.createElement( 'div' );

    //ajax get request
    axios.get('http://api.mediastack.com/v1/news?access_key=9f3462259a927aa9e6fbe71ce8a64405')
    .then ( res => {
        console.log(res.data.data);

        res.data.data.forEach(news => {
            divTag.innerHTML += `
            <p><b>Headlines : ${news.title}</b></p>
            <p>Description : ${news.description}</p>
            <p>Source : ${news.source}</p>
            <p>Read full article : <a href='${news.url}'>${news.url}</a></p>
            <hr></hr>            
            `;            
        });
        todaysnewsContainer.appendChild( divTag ); // putting into page

    })
    .catch ( err => {
        console.log("Error loading news info.",err);

    });

}; //getNews

//get random meal API to the page
const getRandomMeal = () => {
    const divTag = document.createElement( 'div' );
    
    //ajax get request
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
    .then ( res => {
        console.log(res.data.meals);
        
        res.data.meals.forEach(meal => {
            divTag.innerHTML = `
            <img style="float:left" src='${meal.strMealThumb}' width='200' height='200'>  
            <p><b>  ${meal.strMeal}</b></p>
            <p>Cuisine : ${meal.strArea}</p>
            <p>Youtube link (paste the link in browser) : ${meal.strYoutube}</p>
            <br> <br> <br><br><br>                     
            `;
        })            
  
        todaysRandomMealContainer.appendChild( divTag ); // putting contents onto page

    })
    .catch ( err => {
        console.log("Error loading recipe info.",err);

    });



};//getRandomMeal

//search recipes at button click
mealSearchButton.addEventListener('click',function(){
    const searchText = document.querySelector('#searchRecipeText');

    //call the load result 
    loadSearchMealResults(searchText.value); 


});//mealSearchButton

//load recipe search results
const loadSearchMealResults = (searchText) => {
    
    const divTag = document.createElement( 'div' );

    recipeResultsContainer.replaceChildren(); //clearing results container

    //ajax request
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then ( res => {
        //console.log(res.data.meals);

        res.data.meals.forEach(meal => {
            divTag.innerHTML += `
            <img style="float:left" src='${meal.strMealThumb}' width='100' height='100'>  
            <p><b>  ${meal.strMeal}</b></p>
            <p>  Cuisine : ${meal.strArea}</p>
            <p>  Youtube link (paste the link in browser) : ${meal.strYoutube}</p>
            <br>                       
            `;            
        });

        divTag.innerHTML += `
        <button onclick="resetMeals()">Reset</button>        
        `;
        recipeResultsContainer.appendChild( divTag ); //putting results into page

    })
    .catch ( err => {
        console.log("Error loading news info.",err);

    });


}; //loadSearchMealResults

///trivia form submit event

triviaFormNode.addEventListener('submit', ev =>{

    ev.preventDefault(); //stop reloading page

    const divTag = document.createElement( 'div' );

    triviaResultsContainer.replaceChildren(); // clearing results container

    const triviaAmount = document.querySelector('#triviaAmount');
    const triviaCategory = document.querySelector('#triviaCategory');
    const triviaDifficulty = document.querySelector('#triviaDifficulty');
    const triviaType = document.querySelector('#triviaType');
    

    //ajax request
    axios.get(`https://opentdb.com/api.php?amount=${triviaAmount.value}&category=${triviaCategory.value}&difficulty=${triviaDifficulty.value}&type=${triviaType.value}`)
    .then ( res => {
        console.log(res.data.results);
        
        let questionNum = 1;

        //condition to separate question type - multiple and true/false

        if((triviaType.value) == 'multiple'){

        res.data.results.forEach(trivia => {
            
            divTag.innerHTML += `
            <h3>Question ${questionNum}</h3>
            <p>${trivia.question}</p>

            <form>           
            <input type="radio" id="0" name="same" style="width:40px">
            <label for="0" style="width:260px">${trivia.correct_answer}</label><br>
            <input type="radio" id="1" name="same" style="width:40px">
            <label for="1" style="width:260px">${trivia.incorrect_answers[0]}</label> <br> 
            <input type="radio" id="2" name="same" style="width:40px">
            <label for="2" style="width:260px">${trivia.incorrect_answers[1]}</label><br> 
            <input type="radio" id="3" name="same" style="width:40px">
            <label for="3" style="width:260px">${trivia.incorrect_answers[2]}</label>   
            
            </form>          
            `;

            questionNum++;            
        });

        } else if ((triviaType.value) == 'boolean'){
            res.data.results.forEach(trivia => {
            
                divTag.innerHTML += `
                <h3>Question ${questionNum}</h3>
                <p>${trivia.question}</p>
    
                <form>           
                <input type="radio" id="0" name="same">
                <label for="0">${trivia.correct_answer}</label>
                <input type="radio" id="1" name="same">
                <label for="1">${trivia.incorrect_answers[0]}</label>                  
                
                </form>          
                `;
    
                questionNum++;            
            });
            

        }

        triviaQuestions = res.data.results;

        divTag.innerHTML += `
        <button onclick="checkTriviaAnswers()">Check the correct answers</button>
        <button onclick="resetTrivia()">Reset</button>
        `;
        triviaResultsContainer.appendChild( divTag );

    })
    .catch ( err => {
        console.log("Error loading news info.",err);

    });


})//triviaFormNode click event

//get trivia answers
const checkTriviaAnswers = () => {

    triviaResultsContainer.replaceChildren(); //cleareing the container

    const divTag = document.createElement( 'div' );

    triviaQuestions.forEach(trivia => {
        divTag.innerHTML += `
        <p>Question : ${trivia.question}</p>
        <p>Correct Answer : <b>${trivia.correct_answer}</b></p>
                
        `;
    });

    divTag.innerHTML +=`
    <button onclick="resetTrivia()">Reset</button>
    `;

    triviaResultsContainer.appendChild( divTag );

}//checkTriviaAnswers

//reset trivia container
const resetTrivia = () =>{
    triviaResultsContainer.replaceChildren();
};

//reset meals search container
const resetMeals = () =>{
    recipeResultsContainer.replaceChildren();
};


//get random advise to the page
const getRandomAdvice = () => {

    const divTag = document.createElement('div');

    axios.get('https://api.adviceslip.com/advice')
    .then( res => {

        console.log(res.data.slip.advice);
        
        divTag.innerHTML = `
        <h3><q>${res.data.slip.advice}</q></h3>        
        `; 
        adviseContainer.appendChild( divTag );   // putting into page   

    })
    .catch( err => {
        console.log("Error loading advice info.",err);

    });

};

///// All the methods are called here////////

getWeather(); //weather API
getNews(); //news API
getRandomMeal(); //meal API
getRandomAdvice(); //advise slip api

//////////end of coding here/////////////////
