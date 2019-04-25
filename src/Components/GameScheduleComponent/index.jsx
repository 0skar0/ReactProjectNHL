import React, { Component } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import styles from './GameScheduleComponent.module.css';

class GameScheduleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
    };

    this.settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3,
      arrows: false,
      responsive: [
        {
          breakpoint: 320,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false },
        },
      ],
    };
  }

  componentDidMount() {
    axios.get('https://statsapi.web.nhl.com/api/v1/schedule/')
      .then((res) => {
        const result = res.data;
        this.setState({ result });
      });
  }


  render() {
    return (
      <div className={styles.container}>
        <Slider {...this.settings}>
          <div>
            <div className={styles.card}>
              <div className={styles.cardbox}>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Toronto_Maple_Leafs_Logo_1939_-_1967.svg/124px-Toronto_Maple_Leafs_Logo_1939_-_1967.svg.png" alt="logo" />
                <h4>Tor</h4>
                <h4>5</h4>
              </div>
              <div className={styles.cardbox}>
                <img src="https://seeklogo.com/images/B/boston-bruins-logo-41FD986EBD-seeklogo.com.png" alt="logo" />
                <h4>Bos</h4>
                <h4>0</h4>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.card}>
              <div className={styles.cardbox}>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Toronto_Maple_Leafs_Logo_1939_-_1967.svg/124px-Toronto_Maple_Leafs_Logo_1939_-_1967.svg.png" alt="logo" />
                <h4>Tor</h4>
                <h4>5</h4>
              </div>
              <div className={styles.cardbox}>
                <img src="https://seeklogo.com/images/B/boston-bruins-logo-41FD986EBD-seeklogo.com.png" alt="logo" />
                <h4>Bos</h4>
                <h4>0</h4>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.card}>
              <div className={styles.cardbox}>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Toronto_Maple_Leafs_Logo_1939_-_1967.svg/124px-Toronto_Maple_Leafs_Logo_1939_-_1967.svg.png" alt="logo" />
                <h4>Tor</h4>
                <h4>5</h4>
              </div>
              <div className={styles.cardbox}>
                <img src="https://seeklogo.com/images/B/boston-bruins-logo-41FD986EBD-seeklogo.com.png" alt="logo" />
                <h4>Bos</h4>
                <h4>0</h4>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.card}>
              <div className={styles.cardbox}>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Toronto_Maple_Leafs_Logo_1939_-_1967.svg/124px-Toronto_Maple_Leafs_Logo_1939_-_1967.svg.png" alt="logo" />
                <h4>Tor</h4>
                <h4>5</h4>
              </div>
              <div className={styles.cardbox}>
                <img src="https://seeklogo.com/images/B/boston-bruins-logo-41FD986EBD-seeklogo.com.png" alt="logo" />
                <h4>Bos</h4>
                <h4>0</h4>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.card}>
              <div className={styles.cardbox}>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Toronto_Maple_Leafs_Logo_1939_-_1967.svg/124px-Toronto_Maple_Leafs_Logo_1939_-_1967.svg.png" alt="logo" />
                <h4>Tor</h4>
                <h4>5</h4>
              </div>
              <div className={styles.cardbox}>
                <img src="https://seeklogo.com/images/B/boston-bruins-logo-41FD986EBD-seeklogo.com.png" alt="logo" />
                <h4>Bos</h4>
                <h4>0</h4>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.card}>
              <div className={styles.cardbox}>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Toronto_Maple_Leafs_Logo_1939_-_1967.svg/124px-Toronto_Maple_Leafs_Logo_1939_-_1967.svg.png" alt="logo" />
                <h4>Tor</h4>
                <h4>5</h4>
              </div>
              <div className={styles.cardbox}>
                <img src="https://seeklogo.com/images/B/boston-bruins-logo-41FD986EBD-seeklogo.com.png" alt="logo" />
                <h4>Bos</h4>
                <h4>0</h4>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default GameScheduleComponent;
