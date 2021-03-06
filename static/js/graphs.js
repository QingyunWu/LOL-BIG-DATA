    var ctx1 = document.getElementById("top_10_pick_champs_Chart");
    var ctx2 = document.getElementById("bot_10_pick_champs_Chart");
    var ctx3 = document.getElementById("top_10_winrate_champs_Chart");
    var ctx4 = document.getElementById("bot_10_winrate_champs_Chart");
    var ctx5 = document.getElementById("gamePie");
    var ctx6 = document.getElementById("winPie");
    var ctx7 = document.getElementById("top_10_firstBloodKill_champs_Chart");
    var ctx8 = document.getElementById("bot_10_firstBloodKill_champs_Chart");
    var ctx9 = document.getElementById("top_10_firstInhibitorKill_champs_Chart");
    var ctx10 = document.getElementById("bot_10_firstInhibitorKill_champs_Chart");
    var ctx11 = document.getElementById("top_10_firstTowerKill_champs_Chart");
    var ctx12 = document.getElementById("bot_10_firstTowerKill_champs_Chart");
    var ctx13 = document.getElementById("top_10_kills_champs_Chart");
    var ctx14 = document.getElementById("bot_10_kills_champs_Chart");
    var ctx15 = document.getElementById("top_10_towerKills_champs_Chart");
    var ctx16 = document.getElementById("bot_10_towerKills_champs_Chart");
    var ctx17 = document.getElementById("top_10_tripleKills_champs_Chart");
    var ctx18 = document.getElementById("bot_10_tripleKills_champs_Chart");
    var ctx19 = document.getElementById("top_10_quadraKills_champs_Chart");
    var ctx20 = document.getElementById("bot_10_quadraKills_champs_Chart");
    var ctx21 = document.getElementById("top_10_pentaKills_champs_Chart");
    var ctx22 = document.getElementById("bot_10_pentaKills_champs_Chart");
    var myBarChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Jhin', 'LeeSin', 'Caitlyn', 'Ezreal', 'Jinx', 'Vayne', 'Thresh', 'MissFortune', 'Morgana', 'Lucian'],
        datasets: [{
          label: "champion pick rate",
          fill: false,
          backgroundColor: "rgba(255,51,51,0.4)",
          borderColor: "rgba(75,192,192,1)",
          data: [28.37, 27.83, 27.79, 25.76, 22.38, 19.73, 19.15, 18.68, 18.52, 17.1],
          spanGaps: false,
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2,
          }
        },
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Highest 10 Pick Rate Champions'
        }
      }
    });
    var randomColorGenerator = function() {
      return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
    };
    var myBarChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Urgot', 'Kalista', 'Galio', 'Taliyah', 'Karthus', 'Mordekaiser', 'KogMaw', 'Aatrox', 'Azir', 'AurelionSol'],
        datasets: [{
          label: "champion pick rate",
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: randomColorGenerator(),
          borderJoinStyle: 'miter',
          data: [0.68, 0.87, 1.1, 1.3, 1.31, 1.33, 1.37, 1.41, 1.52, 1.84],
          spanGaps: false,
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2,
          }
        },
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Lowest 10 Pick Rate Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: ['Nunu', 'MissFortune', 'Sona', 'Brand', 'Zac', 'Blitzcrank', 'Janna', 'Amumu', 'Annie', 'Velkoz'],
        datasets: [{
          label: "champion win rate",
          fill: false,
          backgroundColor: 'rgba(255,51,51,0.4)',
          borderColor: randomColorGenerator(),
          borderJoinStyle: 'miter',
          data: [53.51, 53.39, 53.37, 52.9, 52.83, 52.7, 52.65, 52.56, 52.49, 52.39],
          spanGaps: false,
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2,
          }
        },
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Highest 10 Win Rate Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: ['Azir', 'Nidalee', 'Ryze', 'Kalista', 'Shen', 'Ivern', 'Vladimir', 'RekSai', 'Lulu', 'Gnar'],
        datasets: [{
          label: "champion win rate",
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: randomColorGenerator(),
          borderJoinStyle: 'miter',
          data: [41.65, 43.34, 43.65, 44.26, 45.31, 45.36, 45.51, 46.04, 46.31, 46.33],
          spanGaps: false,
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2,
          }
        },
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Lowest 10 Win Rate Champions'
        }
      }
    });
    var gamePie = new Chart(ctx5, {
      data: {
        datasets: [{
          data: [
            34.04,
            13.99,
            9.51,
            42.46
          ],
          backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
          ],
          label: 'game distribution' // for legend
        }],
        labels: [
          "NORMAL",
          "ARAM",
          "OTHER",
          "RANK"
        ]
      },
      type: 'pie',
      options: {
        elements: {
          rectangle: {
            borderWidth: 2,
          }
        },
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Gmae Type Distribution'
        }
      }
    });
    var WinPie = new Chart(ctx6, {
      data: {
        datasets: [{
          data: [
            50.95,
            49.05
          ],
          backgroundColor: [
            "#00BFFF",
            "#8B008B"
          ],
          label: 'win rate of two sides' // for legend
        }],
        labels: [
          "Blue Team",
          "Purple Team",
        ]
      },
      type: 'polarArea',
      options: {
        elements: {
          rectangle: {
            borderWidth: 2,
          }
        },
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Win Rate of Two Teams'
        }
      }
    });
    var myBarChart = new Chart(ctx7, {
      type: 'bar',
      data: {
        labels: ['LeeSin', 'Jhin', 'Yasuo', 'Ezreal', 'Caitlyn', 'Teemo', 'Jinx', 'Vayne', 'Lucian', 'MissFortune'],
        datasets: [{
          label: "champion first blood kill rate (0.01%)",
          fill: false,
          backgroundColor: "rgba(255,51,51,0.4)",
          borderColor: "rgba(75,192,192,1)",
          data: [346, 317, 278, 233, 211, 182, 180, 179, 164, 163],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Highest 10 First Blood Kill Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx8, {
      type: 'bar',
      data: {
        labels: ['Galio', 'Taric', 'Skarner', 'RekSai', 'Urgot', 'Rammus', 'Karthus', 'Warwick', 'Azir', 'Lissandra'],
        datasets: [{
          label: "champion first blood kill rate (0.01%)",
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: randomColorGenerator(),
          borderJoinStyle: 'miter',
          data: [8, 12, 13, 14, 14, 15, 16, 16, 20, 21],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Lowest 10 First Blood Kill Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx9, {
      type: 'bar',
      data: {
        labels: ['Jinx', 'Ashe', 'Caitlyn', 'Jhin', 'MissFortune', 'Ezreal', 'Vayne', 'Yasuo', 'Lucian', 'LeeSin'],
        datasets: [{
          label: "champion first inhibitor kill rate (0.01%)",
          fill: false,
          backgroundColor: "rgba(255,51,51,0.4)",
          borderColor: "rgba(75,192,192,1)",
          data: [305, 265, 246, 246, 203, 201, 181, 159, 152, 144],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Highest 10 First Inhibitor Kill Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx10, {
      type: 'bar',
      data: {
        labels: ['Urgot', 'Taliyah', 'RekSai', 'Karthus', 'Taric', 'Sejuani', 'Gragas', 'Shen', 'Maokai', 'Galio'],
        datasets: [{
          label: "champion first inhibitor kill rate (0.01%)",
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: randomColorGenerator(),
          borderJoinStyle: 'miter',
          data: [10, 10, 11, 11, 11, 12, 12, 12, 13, 13],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Lowest 10 First Inhibitor Kill Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx11, {
      type: 'bar',
      data: {
        labels: ['Jinx', 'Caitlyn', 'Jhin', 'MissFortune', 'Yasuo', 'Lucian', 'Ashe', 'Ezreal', 'Draven', 'Vayne'],
        datasets: [{
          label: "champion first tower kill rate (0.01%)",
          fill: false,
          backgroundColor: "rgba(255,51,51,0.4)",
          borderColor: "rgba(75,192,192,1)",
          data: [313, 306, 285, 217, 211, 206, 206, 168, 157, 152],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Highest 10 First Tower Kill Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx12, {
      type: 'bar',
      data: {
        labels: ['RekSai', 'Skarner', 'Galio', 'Karthus', 'Sejuani', 'Rammus', 'Taric', 'Gragas', 'Shen', 'Urgot'],
        datasets: [{
          label: "champion first tower kill rate (0.01%)",
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: randomColorGenerator(),
          borderJoinStyle: 'miter',
          data: [7, 8, 9, 10, 10, 10, 10, 10, 11, 12],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Lowest 10 First Tower Kill Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx13, {
      type: 'bar',
      data: {
        labels: ['Jhin', 'LeeSin', 'Ezreal', 'Jinx', 'Vayne', 'Caitlyn', 'Yasuo', 'MissFortune', 'Lucian', 'Ashe'],
        datasets: [{
          label: "champion kills rate (%)",
          fill: false,
          backgroundColor: "rgba(255,51,51,0.4)",
          borderColor: "rgba(75,192,192,1)",
          data: [202, 181, 160, 149, 147, 146, 140, 137, 114, 113],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Highest 10 Kills Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx14, {
      type: 'bar',
      data: {
        labels: ['Taric', 'RekSai', 'Urgot', 'Galio', 'Skarner', 'Aatrox', 'Janna', 'Soraka', 'Braum', 'Mordekaiser'],
        datasets: [{
          label: "champion kills rate (%)",
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: randomColorGenerator(),
          borderJoinStyle: 'miter',
          data: [7, 9, 9, 10, 10, 12, 12, 13, 13, 13],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Lowest 10 Kills Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx15, {
      type: 'bar',
      data: {
        labels: ['Jinx', 'Caitlyn', 'Jhin', 'MissFortune', 'Vayne', 'Ezreal', 'Ashe', 'Yasuo', 'Lucian', 'Teemo'],
        datasets: [{
          label: "champion tower kills rate (0.1%)",
          fill: false,
          backgroundColor: "rgba(255,51,51,0.4)",
          borderColor: "rgba(75,192,192,1)",
          data: [319, 292, 288, 234, 221, 209, 206, 194, 193, 153],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Highest 10 Tower Kills Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx16, {
      type: 'bar',
      data: {
        labels: ['Galio', 'Taric', 'RekSai', 'Karthus', 'Taliyah', 'Gragas', 'Urgot', 'Sejuani', 'Rammus', 'Skarner'],
        datasets: [{
          label: "champion tower kills rate (0.1%)",
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: randomColorGenerator(),
          borderJoinStyle: 'miter',
          data: [8, 9, 9, 10, 10, 10, 10, 11, 12, 12],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Lowest 10 Tower Kills Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx17, {
      type: 'bar',
      data: {
        labels: ['Jinx', 'Vayne', 'Katarina', 'MasterYi', 'Jhin', 'MissFortune', 'Yasuo', 'Ezreal', 'Caitlyn', 'Lucian'],
        datasets: [{
          label: "champion triple kills rate (0.01%)",
          fill: false,
          backgroundColor: "rgba(255,51,51,0.4)",
          borderColor: "rgba(75,192,192,1)",
          data: [443, 430, 390, 367, 343, 341, 331, 280, 275, 222],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Highest 10 Triple Kills Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx18, {
      type: 'bar',
      data: {
        labels: ['Lissandra', 'Azir', 'Warwick', 'Karthus', 'Rammus', 'Urgot', 'RekSai', 'Skarner', 'Taric', 'Galio'],
        datasets: [{
          label: "champion triple kills rate (0.01%)",
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: randomColorGenerator(),
          borderJoinStyle: 'miter',
          data: [1, 2, 3, 3, 4, 5, 5, 6, 6, 6],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Lowest 10 Triple Kills Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx19, {
      type: 'bar',
      data: {
        labels: ['LeeSin', 'Jhin', 'Yasuo', 'Ezreal', 'Caitlyn', 'Teemo', 'Jinx', 'Vayne', 'Lucian', 'MissFortune'],
        datasets: [{
          label: "champion quadra kills rate (0.001%)",
          fill: false,
          backgroundColor: "rgba(255,51,51,0.4)",
          borderColor: "rgba(75,192,192,1)",
          data: [880, 818, 808, 778, 582, 569, 508, 446, 407, 318],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Highest 10 Quadra Kills Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx20, {
      type: 'bar',
      data: {
        labels: ['Lissandra', 'Azir', 'Warwick', 'Karthus', 'Rammus', 'Urgot', 'RekSai', 'Skarner', 'Taric', 'Galio'],
        datasets: [{
          label: "champion quadra kills rate (0.001%)",
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: randomColorGenerator(),
          borderJoinStyle: 'miter',
          data: [1, 1, 2, 3, 4, 4, 4, 5, 5, 5],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Lowest 10 Quadra Kills Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx21, {
      type: 'bar',
      data: {
        labels: ['Vayne', 'Jinx', 'Katarina', 'MasterYi', 'Yasuo', 'MissFortune', 'Jhin', 'Caitlyn', 'Ezreal', 'Draven'],
        datasets: [{
          label: "champion penta kills rate (0.001%)",
          fill: false,
          backgroundColor: "rgba(255,51,51,0.4)",
          borderColor: "rgba(75,192,192,1)",
          data: [170, 163, 148, 141, 106, 95, 87, 82, 71, 53],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Highest 10 Penta Kills Champions'
        }
      }
    });
    var myBarChart = new Chart(ctx22, {
      type: 'bar',
      data: {
        labels: ['Maokai', 'Taric', 'Janna', 'RekSai', 'Braum', 'Leona', 'Blitzcrank', 'Soraka', 'Ivern', 'Alistar'],
        datasets: [{
          label: "champion penta kill rate (0.001%)",
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: randomColorGenerator(),
          borderJoinStyle: 'miter',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          spanGaps: false
        }]
      },
      options: {
        elements: {
          rectangle: {
            borderWidth: 2
          }
        },
        responsive: true,
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Lowest 10 Penta Kills Champions'
        }
      }
    });
    
