import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [ads, setAds] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const count = 100

    const fetchData = () => {
        setIsLoading(true)
        setError("")
        fetch(`/public-feed/api/v1/ads?size=${count}`,
            {
              method: "GET",
              headers: {
                  "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMudG9rZW4udjFAbmF2Lm5vIiwiYXVkIjoiZmVlZC1hcGktdjEiLCJpc3MiOiJuYXYubm8iLCJpYXQiOjE1NTc0NzM0MjJ9.jNGlLUF9HxoHo5JrQNMkweLj_91bgk97ZebLdfx3_UQ',
                  "Content-Type": "application/json",
              }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Sorry something went wrong")
                }
            })
            .then((data) => {
                setIsLoading(false)
                setAds(data);
                console.log(data);
             })
             .catch((err) => {
                setIsLoading(false)
                setError(err.message)
            });
    };

    console.log("ads:  " + ads)

  return (
    <div>
        <button data-testid="fetchData" onClick={fetchData}>Fetch Ads</button>
        {isLoading && <p data-testid="loading" >Loading...</p>}
        {error && <p>{error}</p>}

        {ads?.content?.length > 0 && (
            <table>
                <tr data-testid="ad">
                    <th>Jobtitle</th>
                    <th>Description</th>
                    <th>ApplicationUrl</th>
                    <th>ApplicationDue</th>
                </tr>
                {ads.content.map((val: any, key: any) => {
                    return (
                        <tr>
                        <td >{val.jobtitle}</td>
                        <td id="description" className="jobTitle">
                            <div dangerouslySetInnerHTML={{ __html: val.description}}>
                            </div>
                        </td>
                        <td className="breakword">{val.applicationUrl}</td>
                        <td>{val.applicationDue}</td>
                        </tr>
                    )
                })}
            </table>
        )}
    </div>
  );
}

export default App;
