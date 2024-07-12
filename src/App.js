import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Tweet } from 'react-tweet'
import { Card } from "antd";
import { Collapse } from "antd";

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

function App() {
  const [tweets, setTweets] = useState([])
  const [keywordTweets, setKeywordTweets] = useState({})


  useEffect(async () => {
    const res = await axios.get('http://localhost:30017/task/Ain6Csy1RhpJhBjzp4wA6drmQNR2YBF9dhkZcKWniF5y/json');
    const _tweets = res.data.data.map(d => {
      if (!keywordTweets[d.data.keyword]) {
        keywordTweets[d.data.keyword] = [];
      }
      keywordTweets[d.data.keyword] = [...keywordTweets[d.data.keyword], d];
      if (d.data.score) {
        keywordTweets[d.data.keyword].averageScore = average(keywordTweets[d.keyword].map(d => d.score));
      }
      setKeywordTweets(keywordTweets);
      return d.id}
    );
    setTweets(_tweets);
  }, []);

  const items = Object.keys(keywordTweets).map(keyword => ({
    key: keyword,
    label: keyword + ' ' + keywordTweets[keyword].averageScore,
    children: (<div className='tweets-container'>
        {
          keywordTweets[keyword].map(tweet =>  <Tweet id={tweet.id} />)
        }
        </div>
        )
  }));

  return (
    <div className="App">
      <div className='container'>
        <Collapse items={items} />
        {/* {
          Object.keys(keywordTweets).map(keyword => {
            return (
              <div className='tweets-container'>
                <Card title={keyword}>
                  <p>{keywordTweets[keyword].averageScore || null}</p>
                </Card>
                <br/><br/><br/><br/>
                {tweets.map(tweet =>  <Tweet id={tweet} />)}
              </div>
            )
          })
        } */}
      </div>
      
    </div>
  );
}

export default App;
