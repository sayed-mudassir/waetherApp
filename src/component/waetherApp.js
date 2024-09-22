import { Component } from "react";
import '../styles/weather-app.css';

const apiKey = "189d824a44b5a436edb611d24b1555c7";
const imgMapping = {
    Clouds : './images/cloudy.webp',
    Rain : './images/rain.jpg',
    Snow : './images/snow.jpeg' 
} 
class WeatherApp  extends Component{
    async fetchWeatherReport(lat,long){
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
            const result = await response.json();
            console.log(result);
            this.setState(result);
        }
        catch(err){
            console.log(err)
        }
    }
    getMyWeatherReport = ()=>{
        navigator.geolocation.getCurrentPosition(
            (pos)=>{
                const {latitude, longitude} = pos.coords;
                console.log(latitude,longitude);
                this.fetchWeatherReport(latitude,longitude);
            },
            (err)=>{
                alert("unable to access the location")
            }
        )
    }
    render(){
        console.log(this.state)
        const onSubmit = (e)=> {
            e.preventDefault();
            const lat = e.target["lat"].value;
            const long = e.target["long"].value;

            this.fetchWeatherReport(lat,long);
        }
        const weatherType = this.state?.weather?.[0]?.main; //optional chaining
        const city = this.state?.name;
        const temp = this.state?.main?.temp - 273.15;
        const windSpeed = this.state?.wind?.speed;
        return(
            <div className="container">
                <h1>WeatherApp</h1>
                <div>
                    <form onSubmit={onSubmit}>
                        <input type="text" name="lat" placeholder="enter latitude"/>
                        <input type="text" name = "long" placeholder="enter longitude" />
                        <button>get weather report</button>
                        <button onClick={this.getMyWeatherReport}>get my weather report</button>
                    </form>
                    <div className="report">
                        {
                            this.state && <>
                            <img src={imgMapping[weatherType]}/>
                            <p><b>Temprature : </b>{temp}</p>
                            <p><b>City : </b>{city}</p>
                            <p><b>Wind speed : </b>{windSpeed}</p>
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    }

}
export default WeatherApp;