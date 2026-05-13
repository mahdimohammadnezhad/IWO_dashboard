import React from 'react'
import Select, { NonceProvider } from 'react-select';
import crop from './crop.png'
import drop from './drop.png'
import dollar from './dollar_sign.png'
import soil from './soil.png'
import irrigation from './irrigation.png'
import { useState } from 'react';
import "./home.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Bar} from 'react-chartjs-2'; 
import { Chart as ChartJS } from 'chart.js/auto'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
const crops =[
    { label: "None", value: 0},
    { label: "Alfalfa ", value: 1 },
    { label: "Sugar beets ", value:  2},
    { label: " Wheat", value: 3 },
    { label: " Bermuda Grass", value:  4},
    { label: " Klein Grass", value:  5},
    { label: "Sudan Grass ", value:  6},
    { label: "Lettuce ", value: 7 },
    { label: "Carrots ", value:8  },
    { label: "Broccoli ", value:  9},
    { label: "Onion ", value: 10 },
    { label: "Spinach ", value: 11 },
    { label: " Sweet Corn", value:  12},
    
  ]
  const crops_m =[
    { label: "Alfalfa ", value: 1 },
    { label: "Sugar beets ", value:  2},
    { label: " Wheat", value: 3 },
    { label: " Bermuda Grass", value:  4},
    { label: " Klein Grass", value:  5},
    { label: "Sudan Grass ", value:  6},
    { label: "Lettuce ", value: 7 },
    { label: "Carrots ", value:8  },
    { label: "Broccoli ", value:  9},
    { label: "Onion ", value: 10 },
    { label: "Spinach ", value: 11 },
    { label: " Sweet Corn", value:  12},
    
  ]
  const soily = [
    { label: "None", value: 0},
    { label: "Sand ", value: 1 },
    { label: "Sand-Fine ", value:  2},
    { label: "Loamy Sand ", value:  3},
    { label: "Loamy Sand- Fine", value:  4},
    { label: "Sandy Loam ", value: 5},
    { label: "Sandy Loam- Fine ", value:  6},
    { label: "Loam ", value:  7},
    { label: "Silt ", value: 8 },
    { label: "Silty Loam ", value:  9},
    { label: "Sandy Clay Loam ", value:  10},
    { label: "Clay Loam ", value:  11},
    { label: "Silty Clay Loam", value: 12 },
    { label: "Sandy Clay ", value:  13},
    { label : "Silty Clay", value : 14},
    { label: "Silty", value:  15},
  ]
  const itype = [
    { label: "None", value: 0},
    { label: "Flood  ", value:  1},
    { label: "Basin  ", value: 2 },
    { label: "Border  ", value: 3 },
    { label: "Furrow  ", value: 4 },
    { label: " Sprinkler Permanent ", value:  5},
    { label: "Hand-Move  ", value: 6 },
    { label: "Linear-Move  ", value:  7},
    { label: " Side-Roll ", value: 8 },
    { label: "Micro-Mini ", value:  9},
    { label: " Hose-Pull ", value:  10},
    { label: "Center-Pivot ", value:  11},
    { label: "Drip", value: 12},
  ]

function Home() {
    const [pa, setPa] = useState(0);
    const [ai1, setai1] = useState('');
    const [ai2, setai2] = useState('');
    const [ai3, setai3] = useState('');
    const [ai4, setai4] = useState('');
    const [ai5, setai5] = useState('');
    let [ c1, setc1] = useState(null);
    let [ c2, setc2] = useState(null);
    let [ c3, setc3] = useState(null);
    let [ c4, setc4] = useState(null);
    let [ c5, setc5] = useState(null);
    let [ pc1, setpc1] = useState(null);
    let [ pc2, setpc2] = useState(null);
    let [ pc3, setpc3] = useState(null);
    let [ pc4, setpc4] = useState(null);
    let [ pc5, setpc5] = useState(null);
    let [ay1, setay1] = useState(null);
    let [ay2, setay2] = useState(null);
    let [ay3, setay3] = useState(null);
    let [ay4, setay4] = useState(null);
    let [ay5, setay5] = useState(null);
    let [et1, setet1] = useState(null);
    let [et2, setet2] = useState(null);
    let [et3, setet3] = useState(null);
    let [et4, setet4] = useState(null);
    let [et5, setet5] = useState(null);
    let [ayv1, setayv1] = useState('');
    let [ayv2, setayv2] = useState('');
    let [ayv3, setayv3] = useState('');
    let [ayv4, setayv4] = useState('');
    let [ayv5, setayv5] = useState('');
    let [ginfo, setginfo] = useState('');
    let [ais, setais] = useState([])
    let [st, setst] = useState(0);
    let [it, setit] = useState(0);
    let [ait, setait] = useState(0)
    const [a,seta]    = useState('');
    const [y, sety] = useState('');
    let [lr, setlr] = useState(0);
    let [d1,setd1] = useState(0);
    let [d2,setd2] = useState(0);
    let [d3,setd3] = useState(0);
    let [d4,setd4] = useState(0);
    let [d5,setd5] = useState(0);
    let [iw0, setiw0] = useState(0);
    let [iw1, setiw1] = useState(0);
    let [iw2, setiw2] = useState(0);
    let [iw3, setiw3] = useState(0);
    let [yr1, setyr1] = useState('');
    let [yr2, setyr2] = useState('');
    let [ie, setie] = useState(null);
    const [c,setc] = useState('');
    const [d,setd] = useState('');
    const [wec,setwa] = useState(null);
    let [ec,setecw] = useState(null);
    let [ad_ec, setad_ec] = useState(null);
    const [wec1,setwa1] = useState(null);
    const [wec2,setwa2] = useState(null);
    const [weca,setweca] = useState(null);
    let [bgc, setbgc] = useState(null)
    let [aie, setaie] = useState(null);
    const [ans, setans] = useState([]);
    const [ans1, setans1] = useState([]);
    const [ans2, setans2] = useState([]);
    const [cps, setcps] = useState([]);
    const [cpsr, setcpsr] = useState([]);
    const [cpsw, setcpsw] = useState([]);
    let [myc, setmyc] = useState('');
    let [mrc, setmrc] = useState('');
    let [mwc, setmwc] = useState('');
    let [imt1, setimt1] = useState('');
    let [imt2, setimt2] = useState('');
    let [imt3, setimt3] = useState('');
    let [imt4, setimt4] = useState('');
    let [imt5, setimt5] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);
    const [selectedValue1, setSelectedValue1] = useState([]);
    const [selectedValue2, setSelectedValue2] = useState([]);
    let arr = []
    const state = {
        labels: cps,
        datasets: [
          {
            label: 'Yield (tons/ha)',
            backgroundColor: `#9acd32`,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 0.5,
            data: ans
          }
        ]
      }

      const state1 = {
        labels: cpsr,
        datasets: [
          {
            label: 'Profit ($/ha)',
            backgroundColor: `#daa520`,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 0.5,
            data: ans1
          }
        ]
      }
      const state2 = {
        labels: cpsw,
        datasets: [
          {
            label: 'Water saving potential (% of total water available for irrigation)',
            backgroundColor: `#00ffff`,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 0.5,
            data: ans2
          }
        ]
      }
      const datatw ={
        labels: ['LRw','ET', 'IEw','IWR'],
        datasets: [
          {
            axis: 'y',
            barThickness: 10,
            label: 'Irrigation water demand (mm)',
            backgroundColor: `#1e90ff`,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 0.5,
            data: [iw0,iw1, iw2, iw3]
          }
        ],
      }
      const dataap = {
        labels: [ai1,ai2, ai3, ai4, ai5],
        datasets: [
          {
            axis: 'y',
            barThickness: 75,
            label: ginfo,
            backgroundColor: bgc,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 0.5,
            data: ais
          }
        ],
      }
      let datadf = [
        { argument: '10%', value: d1  },
        { argument: '20%', value: d2 },
        { argument: '30%', value: d3  },
        { argument: '40%', value: d4 },
        { argument: '50%', value: d5 },
      ];
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2
            }}
        />
    );
    function cpot(){
        if (pa === 0){
            alert("Please enter crop type")
            return
        }
        let ETa = 0;
        let Ym = 0;
        if (pa == 1){
            ETa = 1500;
            Ym = 23;
        }
        else if (pa == 2){
            ETa = 1050;
            Ym = 120;
        }
        else if (pa == 3){
            ETa = 620;
            Ym = 7.5;
        }
        else if (pa == 4){
            ETa = 1200;
            Ym = 19;
        }
        else if (pa == 5){
            ETa = 1250;
            Ym = 24;
        }
        else if (pa == 6){
            ETa = 800;
            Ym = 14;
        }
        else if (pa == 7){
            ETa = 320;
            Ym = 20;
        }
        else if (pa == 8){
            ETa = 600;
            Ym = 110;
        }
        else if (pa == 9){
            ETa = 350;
            Ym = 15;
        }
        else if (pa == 10){
            ETa = 800;
            Ym = 60;
        }
        else if (pa == 11){
            ETa = 200;
            Ym = 14;
        }
        else if (pa == 12){
            ETa =600;
            Ym = 27;
        }
        seta(ETa)
        
    }
    function clr(){
        if (pa === 0){
            alert("Please enter crop type")
            return
        }
        if(ec != ""){
            if(ec!= null){
                if(ec< 0 || ec>2){
                    alert("Irrigation water salinity should be between 0(dS/m) to 2(dS/m)")
                    return
                }
            }
        }
        // if(ec != ""){
        //     if(ec != null ){
        //         if(pa == 1){
        //             if(ec > 2 || ec < 1){
        //                 alert("Irrigation Water Salinity of Alfalfa should be between 1(dS/m) to 2(ds/m) ")
        //                 return
        //             }
        //         }
        //         else if(pa == 2){
        //             if(ec > 5 || ec < 4){
        //                 alert("Irrigation Water Salinity of Sugar beets should be between 4(dS/m) to 5(dS/m)")
        //                 return
        //             }
        //         }
        //         else if(pa == 3){
        //             if(ec > 5 || ec < 3){
        //                 alert("Irrigation Water Salinity of Wheat should be between 3(dS/m) to 5(dS/m)")
        //                 return
        //             }
        //         }
        //         else if(pa == 4){
        //             if(ec > 5 || ec < 4){
        //                 alert("Irrigation Water Salinity of Bermuda Grass should be between 4(dS/m) to 5(dS/m)")
        //                 return
        //             }
        //         }
        //         else if(pa == 5){
        //             if(ec > 5 || ec < 4){
        //                 alert("Irrigation Water Salinity of Klein Grass should be between 4(dS/m) to 5(dS/m)")
        //                 return
        //             }
        //         }
        //         else if(pa == 6){
        //             if(ec > 2.5 || ec < 1){
        //                 alert("Irrigation Water Salinity of Sudan Grass should be between 1(dS/m) to 2.5(dS/m)")
        //                 return
        //             }
        //         }
        //         else if(pa == 7){
        //             if(ec > 1.5 || ec < 0.5){
        //                 alert("Irrigation Water Salinity of Lettuce should be between 0.5(dS/m) to 1.5(dS/m)")
        //                 return
        //             }
        //         }
        //         else if(pa == 8){
        //             if(ec > 1.5 || ec < 0.5){
        //                 alert("Irrigation Water Salinity of Carrots should be between 0.5(dS/m) to 1.5(dS/m)")
        //                 return
        //             }
        //         }
        //         else if(pa == 9){
        //             if(ec > 2.5 || ec < 1){
        //                 alert("Irrigation Water Salinity of Broccoli should be between 1(dS/m) to 2.5(dS/m)")
        //                 return
        //             }
        //         }
        //         else if(pa == 10){
        //             if(ec > 1.5 || ec < 0.5){
        //                 alert("Irrigation Water Salinity of Onions should be between 0.5(dS/m) to 1.5(dS/m)")
        //                 return
        //             }
        //         }
        //         else if(pa == 11 ){
        //             if(ec > 2 || ec < 1 ){
        //                 alert("Irrigation Water Salinity of Spinach should be between 1(dS/m) to 2(dS/m)")
        //                 return
        //             }
        //         }
        //         else if(pa == 12){
        //             if(ec > 2 || ec < 0.5){
        //                 alert("Irrigation Water Salinity of Sweet Corn should be between 0.5(dS/m) to 2(dS/m)")
        //                 return
        //             }
        //         }
        //         // if(ec != ""){
        //         //     if(ec> 5 || ec < 0.5){
        //         //         alert("Irrigation Water Salinity should be between 0.5(dS/m) to 5(dS/m)")
        //         //         return
        //         //     }
        //         // }
        //         // else if(ec == ""){
        //         //     ec = null
        //         // }
        //     }
        // }
        else if (ec == ""){
            ec = null
        }
        if(ie != null ){
            if(ie != ""){
                if(ie> 100 || ie < 50){
                    alert("Irrigation Efficieny should be between 50% to 100%")
                    return
                }
            }
        }
        if(ie == null || ie == ""){
            if(it == 1){
                ie = 68
            }
            else if (it == 2){
                ie = 83
            }
            else if (it == 3){
                ie = 73
            }
            else if (it == 4){
                ie = 73
            }
            else if (it == 5){
                ie = 78
            }
            else if (it == 6){
                ie = 70
            }
            else if (it == 7){
                ie = 82
            }
            else if (it == 8){
                ie = 70
            }
            else if (it == 9){
                ie = 81
            }
            else if (it == 10){
                ie = 73
            }
            else if (it == 11){
                ie = 80
            }
            else if (it == 12) {
                ie =  86
            }
            else{
                ie = 68
            }
        }
        let ky=0;
        let eci =0;
        let ecw =0;
        let ETm =0;
        let Ym = 0;
        let k = 0;
        let clz = 0;
        let slr = 0;
        let m = 0;
        console.log(ec)
        if (pa == 1){
            ky=1;
            eci = 2;
            ecw = ec ?? 1.2;
            ETm=1500;
            Ym = 23;
           }
        else if ( pa == 2){
           ky = 0.85;
           eci=7;
           ecw=ec ?? 1.2;
           ETm=1050;
           Ym = 120;
        }
        else if (pa == 3){
            ky = 1.05;
           eci=6;
           ecw=ec ?? 1.2;
           ETm=620;
           Ym = 7.5;
        }
        else if (pa == 4){
            ky = 0.85;
           eci=6.9;
           ecw=ec ?? 1.2;
           ETm=1300;
           Ym = 19;
        }
        else if (pa ==5 ){
            ky = 0.9;
           eci=4;
           ecw= ec ?? 1.2;
           ETm=1350;
           Ym = 24;
        }
        else if (pa == 6){
            ky = 0.9;
           eci=2.8;
           ecw= ec ?? 1.2;
           ETm=800;
           Ym = 14;
        }
        else if (pa ==7 ){
            ky = 1.15;
            eci=1.3;
            ecw= ec ?? 1.2;
            ETm=320;
            Ym = 20;
        }
        else if (pa == 8){
            ky =1.1 ;
          eci=1;
          ecw= ec ?? 1.2;
          ETm=600;
          Ym = 110;
        }
        else if (pa == 9){
            ky = 1;
           eci=2.8;
           ecw= ec ?? 1.2;
           ETm=350;
           Ym = 15;
        }
        else if (pa == 10){
            ky =1.1 ;
          eci=1.2;
          ecw=ec ?? 1.2;
          ETm=800;
          Ym = 60;
        }
        else if (pa ==11 ){
            ky = 1.15;
           eci=2;
           ecw=ec ?? 1.2;
           ETm=200;
           Ym = 14;
        }
        else if (pa ==12 ){
            ky = 1.1;
          eci=1.7;
          ecw= ec ?? 1.2;
          ETm=600;
          Ym = 27;
        }
        if(it == 0){
            it =1
        }
        if(st == 0){
            st = 5
        }
        if ((it && st) != 0 ){
            if (it == 1 ){
                k = 0.682
                clz = 100
            }
            else if(it ==2){
                k = 0.682
                clz = 100
            }
            else if(it ==3){
                k = 0.682
                clz = 100
            }
            else if(it ==4){
                k = 0.682
                clz = 85
            }
            else if( it == 12){
                k =0.883
                clz = 40
            }
            else {
                k = 0.769
                clz = 100
            }
            if(pa == 1 || pa == 2 || pa == 3 || pa == 4 || pa == 5 || pa == 6 || pa == 10){
                if(st == 1){
                    m = 0.1575;
                }
                else if (st == 2){
                    m = 0.1114
                }
                else if (st == 3){
                    m = 0.202
                }
                else if (st == 4){
                    m = 0.1964
                }
                else if (st == 5){
                    m = 0.239
                }
                else if (st == 6){
                    m = 0.2736
                }
                else if (st == 7){
                    m = 0.376
                }
                else if (st == 8){
                    m = 0.4129
                }
                else if (st == 9){
                    m = 0.405
                }
                else if (st == 10){
                    m = 0.3236
                }
                else if (st == 11){
                    m = 0.3971
                }
                else if (st == 12){
                    m = 0.4031
                }
                else if (st == 13){
                    m = 0.3855
                }
                else if (st == 14){
                    m = 0.4109
                }   
                else if (st == 15){
                    m = 0.429
                }
            }
            else {
                if(st == 1){
                    m = 0.1795;
                }
                else if (st == 2){
                    m = 0.1274
                }
                else if (st == 3){
                    m = 0.23
                }
                else if (st == 4){
                    m = 0.2244
                }
                else if (st == 5){
                    m = 0.273
                }
                else if (st == 6){
                    m = 0.3116
                }
                else if (st == 7){
                    m = 0.428
                }
                else if (st == 8){
                    m = 0.4709
                }
                else if (st == 9){
                    m = 0.461
                }
                else if (st == 10){
                    m = 0.3676
                }
                else if (st == 11){
                    m = 0.4511
                }
                else if (st == 12){
                    m = 0.4591
                }
                else if (st == 13){
                    m = 0.4375
                }
                else if (st == 14){
                    m = 0.4669
                }   
                else if (st == 15){
                    m = 0.487
                }
            }
            slr = ecw/(((2/(k * m))*eci) - ecw)
            setd((slr * 100).toFixed(2))
        }
        d1 = ky*(1-((0.9 * ETm)/ETm)) ;
        d2 = ky*(1-((0.8 * ETm)/ETm)) ;
        d3 = ky*(1-((0.7 * ETm)/ETm)) ;
        d4 = ky*(1-((0.6 * ETm)/ETm)) ;
        d5 = ky*(1-((0.5 * ETm)/ETm)) ;
        setd1((d1*100).toFixed(0) + "%" )
        setd2((d2*100).toFixed(0) + "%" )
        setd3((d3*100).toFixed(0) + "%" )
        setd4((d4*100).toFixed(0) + "%" )
        setd5((d5*100).toFixed(0) + "%" )
        lr = ecw/((5*eci) - ecw)
        iw1= (ETm )
        iw3= (ETm )/((ie/100)*(1-lr))
        iw2 = iw3 - (iw3*(ie/100))
        iw0 = iw3 - iw1 - iw2
        setiw1(ETm.toFixed(0))
        setiw2(iw2.toFixed(0))
        setiw3(iw3.toFixed(0))
        setiw0(iw0.toFixed(0))
        setc((lr*100).toFixed(2))
        sety(Ym)
        console.log(ie)
       }
       const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
      }
      const handleChange1 = (e) => {
        setSelectedValue1(Array.isArray(e) ? e.map(x => x.value) : []);
      }
      const dynamictable = (x) => {
          console.log(x)
          return (
              <td>x</td>
          )
      }
      const handleChange2 = (e) => {
        //console.log(e[e.length - 1].label)
        //console.log(e[0].label)
        dynamictable(e[e.length - 1].label)
        arr.push(e[e.length - 1].label)
        setSelectedValue2(Array.isArray(e) ? e.map(x => x.value) : []); 
        console.log(arr)
        //setSelectedValue2(selectedValue2 => [...selectedValue2, e[0].label])
        //console.log(selectedValue2)
        // console.log(selectedValue2)
        // var rows = [];
        // for (var i =0; i<selectedValue2.length;i++){
        //     rows.push(crops[selectedValue2[i]-1].label)
        // }
        // seta3(rows)
       //console.log(rows) 
       //console.log(e[0].label)
        
      }
 
    function myo(){
        if (wec == null){
            alert("Please enter amount of water available")
            return
        }
        let eci =0;
        let ecw =0;
        let ETm =0;
        let ky = 0;
        let Ym = 0;
        let Eta = 0;
        let Ya = 0;
        while(ans.length > 0) {
            ans.pop();
        }
        while(cps.length > 0) {
            cps.pop();
        }
        for(let i=0;i<selectedValue.length;i++){
            if (selectedValue[i] == 1){
                eci = 2;
                ecw = 1.3;
                ETm=1500;
                ky = 1;
                Ym = 23;
               }
            else if ( selectedValue[i] == 2){
               eci=7;
               ecw= 4.7;
               ETm=1050;
               ky = 0.85;
               Ym = 120;
            }
            else if (selectedValue[i] == 3){
               eci=6;
               ecw= 4;
               ETm=620;
               ky = 1.05;
               Ym = 7.5;
            }
            else if (selectedValue[i] == 4){
               eci=6.9;
               ecw= 4.6;
               ETm=1200;
               ky = 0.9;
               Ym = 19;
            }
            else if (selectedValue[i] ==5 ){
               eci=4;
               ecw=  2.7;
               ETm=1250;
               ky = 0.9;
               Ym = 24;
            }
            else if (selectedValue[i] == 6){
               eci=2.8;
               ecw= 1.9;
               ETm=800;
               ky = 0.9;
               Ym = 14;
            }
            else if (selectedValue[i] ==7 ){
                eci=1.3;
                ecw= 1;
                ETm=320;
                ky = 1.15;
               Ym = 20;
            }
            else if (selectedValue[i] == 8){
              eci=1;
              ecw= 0.8;
              ETm=600;
              ky = 1.1;
              Ym = 110;
            }
            else if (selectedValue[i] == 9){
               eci=2.8;
               ecw= 1.9;
               ETm=350;
               ky = 1;
               Ym = 15;
            }
            else if (selectedValue[i] == 10){
              eci=1.2;
              ecw=0.9;
              ETm=800;
              ky = 1.1;
               Ym = 60;
            }
            else if (selectedValue[i] ==11 ){
               eci=2;
               ecw=1.3;
               ETm=200;
               ky = 1.15;
               Ym = 14;
            }
            else if (selectedValue[i] ==12 ){
              eci=1.7;
              ecw= 1.1;
              ETm=600;
              ky = 1.1;
               Ym = 27;
            }
            Eta = wec * 0.68 * (1-(ecw/((5*eci) - ecw)))
            Ya = Ym * ((ky*((Eta/ETm)-1))+1)
            // setans([...ans,Ya]);
            ans.push(Ya)
        }
        for(let i =0 ; i<selectedValue.length;i++){
            //cps.push(crops[selectedValue[i]].label)
            setcps(cps => [...cps, crops_m[selectedValue[i]-1].label])
        }
        let i = ans.indexOf(Math.max(...ans));
        setmyc(crops_m[selectedValue[i]-1].label)
    }
    function mr(){
        if (wec1 == null){
            alert("Please enter amount of water available")
            return
        }
        let eci =0;
        let ecw =0;
        let ETm =0;
        let ky = 0;
        let Ym = 0;
        let Eta = 0;
        let Ya = 0;
        let cost = 200;
        let pcost = 0;
        let revenue = 0;
        let profit =0 ;
        while(ans1.length > 0) {
            ans1.pop();
        }
        while(cpsr.length > 0) {
            cpsr.pop();
        }
        for(let i=0;i<selectedValue1.length;i++){
            if (selectedValue1[i] == 1){
                eci = 2;
                ecw = 1.3;
                ETm=1500;
                ky = 1;
                Ym = 23;
               }
            else if ( selectedValue1[i] == 2){
               eci=7;
               ecw= 4.7;
               ETm=1050;
               ky = 0.85;
               Ym = 120;
            }
            else if (selectedValue1[i] == 3){
               eci=6;
               ecw= 4;
               ETm=620;
               ky = 1.05;
               Ym = 7.5;
            }
            else if (selectedValue1[i] == 4){
               eci=6.9;
               ecw= 4.6;
               ETm=1200;
               ky = 0.9;
               Ym = 19;
            }
            else if (selectedValue1[i] ==5 ){
               eci=4;
               ecw=  2.7;
               ETm=1250;
               ky = 0.9;
               Ym = 24;
            }
            else if (selectedValue1[i] == 6){
               eci=2.8;
               ecw= 1.9;
               ETm=800;
               ky = 0.9;
               Ym = 14;
            }
            else if (selectedValue1[i] ==7 ){
                eci=1.3;
                ecw= 1;
                ETm=320;
                ky = 1.15;
               Ym = 20;
            }
            else if (selectedValue1[i] == 8){
              eci=1;
              ecw= 0.8;
              ETm=600;
              ky = 1.1;
              Ym = 110;
            }
            else if (selectedValue1[i] == 9){
               eci=2.8;
               ecw= 1.9;
               ETm=350;
               ky = 1;
               Ym = 15;
            }
            else if (selectedValue1[i] == 10){
              eci=1.2;
              ecw=0.9;
              ETm=800;
              ky = 1.1;
               Ym = 60;
            }
            else if (selectedValue1[i] ==11 ){
               eci=2;
               ecw=1.3;
               ETm=200;
               ky = 1.15;
               Ym = 14;
            }
            else if (selectedValue1[i] ==12 ){
              eci=1.7;
              ecw= 1.1;
              ETm=600;
              ky = 1.1;
               Ym = 27;
            }
            Eta = wec1 * 0.68 * (1-(ecw/((5*eci) - ecw)))
            Ya = Ym * ((ky*((Eta/ETm)-1))+1)
            // console.log(Eta)
            // console.log(Ya)
            revenue = Ya * cost
            pcost = (0.2) * revenue
            // console.log(pcost)
            profit = revenue - pcost
            ans1.push(profit)
        }
        for(let i =0 ; i<selectedValue1.length;i++){
            //cps.push(crops[selectedValue[i]].label)
            setcpsr(cpsr => [...cpsr, crops_m[selectedValue1[i]-1].label])
        }
        let i = ans1.indexOf(Math.max(...ans1));
        setmrc(crops_m[selectedValue1[i]-1].label)
    }
    function mwe(){
        if (wec2 == null){
            alert("Please enter amount of water available")
            return
        }
        let eci =0;
        let ecw =0;
        let ETm =0;
        let ky = 0;
        let Ym = 0;
        let Eta = 0;
        let Ya = 0;
        while(ans2.length > 0) {
            ans2.pop();
        }
        while(cpsw.length > 0) {
            cpsw.pop();
        }
        for(let i=0;i<selectedValue2.length;i++){
            if (selectedValue2[i] == 1){
                eci = 2;
                ecw = 1.3;
                ETm=1500;
                ky = 1;
                Ym = 23;
               }
            else if ( selectedValue2[i] == 2){
               eci=7;
               ecw= 4.7;
               ETm=1050;
               ky = 0.85;
               Ym = 120;
            }
            else if (selectedValue2[i] == 3){
               eci=6;
               ecw= 4;
               ETm=620;
               ky = 1.05;
               Ym = 7.5;
            }
            else if (selectedValue2[i] == 4){
               eci=6.9;
               ecw= 4.6;
               ETm=1200;
               ky = 0.9;
               Ym = 19;
            }
            else if (selectedValue2[i] ==5 ){
               eci=4;
               ecw=  2.7;
               ETm=1250;
               ky = 0.9;
               Ym = 24;
            }
            else if (selectedValue2[i] == 6){
               eci=2.8;
               ecw= 1.9;
               ETm=800;
               ky = 0.9;
               Ym = 14;
            }
            else if (selectedValue2[i] ==7 ){
                eci=1.3;
                ecw= 1;
                ETm=320;
                ky = 1.15;
               Ym = 20;
            }
            else if (selectedValue2[i] == 8){
              eci=1;
              ecw= 0.8;
              ETm=600;
              ky = 1.1;
              Ym = 110;
            }
            else if (selectedValue2[i] == 9){
               eci=2.8;
               ecw= 1.9;
               ETm=350;
               ky = 1;
               Ym = 15;
            }
            else if (selectedValue2[i] == 10){
              eci=1.2;
              ecw=0.9;
              ETm=800;
              ky = 1.1;
               Ym = 60;
            }
            else if (selectedValue2[i] ==11 ){
               eci=2;
               ecw=1.3;
               ETm=200;
               ky = 1.15;
               Ym = 14;
            }
            else if (selectedValue2[i] ==12 ){
              eci=1.7;
              ecw= 1.1;
              ETm=600;
              ky = 1.1;
               Ym = 27;
            }
            Eta = wec2 * 0.68 * (1-(ecw/((5*eci) - ecw)))
            Ya = Ym * ((ky*((Eta/ETm)-1))+1)
            ans2.push((Ya/wec2))
        }
        console.log(selectedValue2)
        for(let i =0 ; i<selectedValue2.length;i++){
            //cps.push(crops[selectedValue[i]].label)
            setcpsw(cpsw => [...cpsw, crops_m[selectedValue2[i]-1].label])
        }
        let i = ans2.indexOf(Math.max(...ans2));
        setmwc(crops_m[selectedValue2[i]-1].label)
    }
    function cald(){
        if (pa == 0){
            alert("Please enter crop type")
            return
        }
        let ky=0;
        let Etm=0;
        if (pa == 1){
         ky=1;
         Etm=1500;
        }
        else if ( pa == 2){
         ky = 0.85;
         Etm = 1050;
     }
     else if (pa == 3){
         ky = 1.05;
         Etm = 620;
     }
     else if (pa == 4){
         ky = 0.9;
         Etm = 1200;
     }
     else if (pa ==5 ){
         ky = 0.9;
         Etm = 1250;
     }
     else if (pa == 6){
         ky = 0.9;
         Etm = 800;
     }
     else if (pa ==7 ){
         ky = 1.15;
         Etm = 320;
     }
     else if (pa == 8){
         ky =1.1 ;
         Etm =600 ;
     }
     else if (pa == 9){
         ky = 1;
         Etm = 350;
     }
     else if (pa == 10){
         ky =1.1 ;
         Etm = 800;
     }
     else if (pa ==11 ){
         ky = 1.15;
         Etm = 200;
     }
     else if (pa ==12 ){
         ky = 1.1;
         Etm = 600;
     }
     d1 = ky*(1-((0.9 * Etm)/Etm)) ;
     d2 = ky*(1-((0.8 * Etm)/Etm)) ;
     d3 = ky*(1-((0.7 * Etm)/Etm)) ;
     d4 = ky*(1-((0.6 * Etm)/Etm)) ;
     d5 = ky*(1-((0.5 * Etm)/Etm)) ;
     setd1((d1*100).toFixed(2))
     setd2((d2*100).toFixed(2))
     setd3((d3*100).toFixed(2))
     setd4((d4*100).toFixed(2))
     setd5((d5*100).toFixed(2))
     
    }
    function rap(){
        if (weca == null){
            alert("Please enter the total water available for irrigation (mm)")
            return
        }
        if (weca == ""){
            alert("Please enter the total water available for irrigation (mm)")
            return
        }
        if (weca != null && weca != ""){
            if(weca< 0 || weca > 5500){
                alert("Total water available for irrigation should be between 0 mm and 5500 mm")
                return
            }
        }
        if(ad_ec != ""){
            if(ad_ec!= null){
                if(ad_ec< 0 || ad_ec>2){
                    alert("Irrigation water salinity should be between 0(dS/m) to 2(dS/m)")
                    return
                }
            }
        }
        else if (ad_ec == ""){
            ad_ec = null
        }
        if(et1 != null){
                    if(et1 != ""){
                        if(et1 < 100 || et1 > 2000){
                            alert("ETm should be in the range of 100mm to 2000mm")
                            return
                        }
                    }
                }
        if(et2 != null){
            if(et2 != ""){
                if(et2 < 100 || et2 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(et3 != null){
            if(et3 != ""){
                if(et3 < 100 || et3 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(et4 != null){
            if(et4 != ""){
                if(et4 < 100 || et4 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(et5 != null){
            if(et5 != ""){
                if(et5 < 100 || et5 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(aie != null ){
            if(aie != ""){
                if(aie> 100 || aie < 50){
                    alert("Irrigation Efficieny should be between 50% to 100%")
                    return
                }
            }
        }
        if(aie == null || aie == ""){
            if(ait == 1){
                aie = 68
            }
            else if (ait == 2){
                aie = 83
            }
            else if (ait == 3){
                aie = 73
            }
            else if (ait == 4){
                aie = 73
            }
            else if (ait == 5){
                aie = 78
            }
            else if (ait == 6){
                aie = 70
            }
            else if (ait == 7){
                aie = 82
            }
            else if (ait == 8){
                aie = 70
            }
            else if (ait == 9){
                aie = 81
            }
            else if (ait == 10){
                aie = 73
            }
            else if (ait == 11){
                aie = 80
            }
            else if (ait == 12){
                aie = 86
            }
            else{
                aie = 68
            }
        }
        if (c1 == ""){
            c1 = null
        }
        if (c2 == ""){
            c2 = null
        }
        if (c3 == ""){
            c3 = null
        }
        if (c4 == ""){
            c4 = null
        }
        if (c5 == ""){
            c5 = null
        }
        if (pc1 == ""){
            pc1 = null
        }
        if (pc2 == ""){
            pc2 = null
        }
        if (pc3 == ""){
            pc3 = null
        }
        if (pc4 == ""){
            pc4 = null
        }
        if (pc5 == ""){
            pc5 = null
        }
        if(c1 <0 || c2 <0 || c3 <0 || c4 <0 || c5 <0){
            alert("Crop price cannot be negative")
            return
        }
        if(pc1 <0 || pc2 <0 || pc3 <0 || pc4 <0 || pc5 <0){
            alert("Production cost cannot be negative")
            return
        }
        setginfo('Profit ($/ha)') 
        setbgc('#daa520')
        let Ya = 0;
        let cost = 0;
        let pcost = 0;
        let revenue = 0;
        let profit =0 ;
        let ans_arr = [];
        let aiw3 = 0;
        let my_arr = [ayv1, ayv2, ayv3, ayv4, ayv5]
        let y_arr = [ay1, ay2, ay3, ay4, ay5]
        let etm_arr = [et1, et2, et3, et4, et5]
        let c_arr = [c1,c2, c3, c4, c5]
        let p_arr = [pc1, pc2, pc3, pc4, pc5]
        let imt_arr = [imt1,imt2,imt3,imt4,imt5]
        for(let i=0;i<my_arr.length;i++){
            let eci =0;
            let ecw =0;
            let ETm =0;
            let ky = 0;
            let Ym = 0;
            let Eta = 0;
            let temp = 1;
            let lr = 0;
            let aiw3 = 0;
            let wsp =0;
            if (y_arr[i] == ""){
                y_arr[i] = null
            }
            if (etm_arr[i] == ""){
                etm_arr[i] = null
            }
            if (my_arr[i] == 1){
                eci = 2;
                ecw = ad_ec ?? 1.2;
                ETm= etm_arr[i] ?? 1500;
                ky = 1;
                Ym = y_arr[i] ?? 23;
                cost = c_arr[i] ?? 209;
                if ( Ym > 30 || Ym < 15){
                    alert("The maximum expected yield for Alfalfa should be between 15(tons/ha) to 30(tons/ha)")
                    return
                }
               }
            else if ( my_arr[i] == 2){
               eci=7;
               ecw = ad_ec ?? 1.2;
               ETm=etm_arr[i] ?? 1050;
               ky = 0.85;
               Ym = y_arr[i] ?? 120;
               cost = c_arr[i] ?? 147;
               if ( Ym > 140 || Ym < 100){
                alert("The maximum expected yield for Sugar beets should be between 100(tons/ha) to 140(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 3){
               eci=6;
               ecw = ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 620;
               ky = 1.05;
               Ym = y_arr[i] ?? 7.5;
               cost = c_arr[i] ?? 288;
               if ( Ym > 10 || Ym < 5){
                alert("The maximum expected yield for Wheat should be between 5(tons/ha) to 10(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 4){
               eci=6.9;
               ecw = ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 1300;
               ky = 0.9;
               Ym =y_arr[i] ??  19;
               cost = c_arr[i] ?? 200;
               if ( Ym > 25 || Ym < 15){
                alert("The maximum expected yield for Bermuda Grass should be between 15(tons/ha) to 25(tons/ha)")
                return
            }
            }
            else if (my_arr[i] ==5 ){
               eci=4;
               ecw = ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 1350;
               ky = 0.9;
               Ym = y_arr[i] ?? 24;
               cost = c_arr[i] ?? 200;
               if ( Ym > 30 || Ym < 20){
                alert("The maximum expected yield for Klein Grass should be between 20(tons/ha) to 30(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 6){
               eci=2.8;
               ecw = ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 800;
               ky = 0.9;
               Ym = y_arr[i] ?? 14;
               cost = c_arr[i] ?? 200;
               if ( Ym > 20 || Ym < 10){
                alert("The maximum expected yield for Sudan Grass should be between 10(tons/ha) to 20(tons/ha)")
                return
            }
            }
            else if (my_arr[i] ==7 ){
                eci=1.3;
                ecw = ad_ec ?? 1.2;
                ETm= etm_arr[i] ?? 320;
                ky = 1.15;
               Ym = y_arr[i] ?? 20;
               cost = c_arr[i] ?? 683.93;
               if ( Ym > 30 || Ym < 10){
                alert("The maximum expected yield for Lettuce should be between 10(tons/ha) to 30(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 8){
              eci=1;
              ecw = ad_ec ?? 1.2;
              ETm= etm_arr[i] ?? 600;
              ky = 1.1;
              Ym = y_arr[i] ?? 110;
              cost = c_arr[i] ?? 464.29;
              if ( Ym > 130 || Ym < 90){
                alert("The maximum expected yield for Carrots should be between 90(tons/ha) to 130(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 9){
               eci=2.8;
               ecw = ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 350;
               ky = 1;
               Ym = y_arr[i] ?? 15;
               cost = c_arr[i] ?? 919.64;
               if ( Ym > 20 || Ym < 10){
                alert("The maximum expected yield for Broccoli should be between 10(tons/ha) to 20(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 10){
              eci=1.2;
              ecw = ad_ec ?? 1.2;
              ETm= etm_arr[i] ?? 800;
              ky = 1.1;
               Ym = y_arr[i] ?? 60;
               cost = c_arr[i] ?? 503.57;
               if ( Ym > 70 || Ym <50){
                alert("The maximum expected yield for Onions should be between 50(tons/ha) to 70(tons/ha)")
                return
            }
            }
            else if (my_arr[i] ==11 ){
               eci=2;
               ecw = ad_ec ?? 1.2;
               ETm=etm_arr[i] ?? 200;
               ky = 1.15;
               Ym = y_arr[i] ?? 14;
               cost = c_arr[i] ?? 1237.50;
               if ( Ym > 20 || Ym <10){
                alert("The maximum expected yield for Spinach should be between 10(tons/ha) to 20(tons/ha)")
                return
            }
            }
            else if (my_arr[i] ==12 ){
              eci=1.7;
              ecw = ad_ec ?? 1.2;
              ETm= etm_arr[i] ?? 600;
              ky = 1.1;
               Ym = y_arr[i] ?? 27;
               cost = c_arr[i] ?? 1482.14;
               if ( Ym > 40 || Ym <20){
                alert("The maximum expected yield for Sweet Corn should be between 20(tons/ha) to 40(tons/ha)")
                return
            }
            }
            else{
                Ym = 0;
                temp = 0;
            }
            Eta = weca * (aie/100) * (1-(ecw/((5*eci) - ecw)))
            Ya = Ym * ((ky*((Eta/ETm)-1))+1)
            if (Ya>Ym){
                Ya = Ym
            }
            revenue = Ya * cost
            pcost = p_arr[i] ?? (0.2 * revenue)
            profit = revenue - pcost
            lr = ecw/((5*eci) - ecw)
            aiw3= (ETm )/((aie/100)*(1-lr))
            wsp = ((weca - aiw3) / weca) * temp
            if(weca == 0){
                profit = 0
            }
            ans_arr.push(Number(profit).toFixed(0))
            if ((weca *(aie/100)) < ETm){
                // let value = 0;
                // value = ((ETm - (weca*(aie/100)))/ETm) *100
                imt_arr[i]= "There may be yield reduction as deficit irrigation of " + (((ETm - weca *(aie/100)) * 100) / ETm).toFixed(0) +"% is practiced"
            }
            else if ((weca *(aie/100) > ETm) && (weca < aiw3)){
                imt_arr[i] ="Not enough water for leaching. There could be yield reduction because of salinity build up."
            }
            else if (aiw3 == weca ){
                imt_arr[i] ="Maximum yield could be achieved, since IE, ET and leaching requirements are fulfilled."
            }
            else if ( weca > aiw3 ){
                imt_arr[i]=(wsp*100).toFixed(0) + "% of the water can be conserved and still maximum yield could be obtained."
            }
            else{
                imt_arr[i] = " "
            }
        }
        
        setais(ans_arr)
        setimt1(imt_arr[0])
        setimt2(imt_arr[1])
        setimt3(imt_arr[2])
        setimt4(imt_arr[3])
        setimt5(imt_arr[4])

    }
    function yap(){
        if (weca == null){
            alert("Please enter the total water available for irrigation (mm)")
            return
        }
        if (weca == ""){
            alert("Please enter the total water available for irrigation (mm)")
            return
        }
        if (weca != null && weca != ""){
            if(weca< 0 || weca > 5500){
                alert("Total water available for irrigation should be between 0 mm and 5500 mm")
                return
            }
        }
        if(ad_ec != ""){
            if(ad_ec!= null){
                if(ad_ec< 0 || ad_ec>2){
                    alert("Irrigation water salinity should be between 0(dS/m) to 2(dS/m)")
                    return
                }
            }
        }
        else if (ad_ec == ""){
            ad_ec = null
        }
        // if(ay1 != null ||ay2 != null || ay3 != null || ay4 != null || ay5 != null){
        //     if(ay1 != "" || ay2 != "" || ay3 != "" || ay4 != "" || ay5 != ""){
        //         if(ay1 < 5 || ay1 > 150 || ay2 < 5 || ay2 > 150 || ay3 < 5 || ay3 > 150|| ay4 < 5 || ay4 > 150|| ay5 < 5 || ay5 > 150){
        //             alert("Expected yield should be in the range of 5 to 150 ")
        //         }
        //     }
        // }
        // if(ay1 != null ){
        //     if(ay1 != ""){
        //     if(ay1 < 5 || ay1 > 150){
        //         alert("Expected yield should be in the range of 5(tons/ha) to 150(tons/ha) ")
        //         return
        //     }
        // }
        // }
        // if(ay2 != null){
        //     if(ay2 != ""){
        //     if(ay2 < 5 || ay2 > 150){
        //         alert("Expected yield should be in the range of 5(tons/ha) to 150(tons/ha) ")
        //         return
        //     }
        // }
        // }
        // if(ay3 != null){
        //     if(ay3 != ""){
        //     if(ay3 < 5 || ay3 > 150){
        //         alert("Expected yield should be in the range of 5(tons/ha) to 150(tons/ha) ")
        //         return
        //     }
        // }
        // }
        // if(ay4 != null){
        //     if(ay4 != ""){
        //     if(ay4 < 5 || ay4 > 150){
        //         alert("Expected yield should be in the range of 5(tons/ha) to 150(tons/ha) ")
        //         return
        //     }
        // }
        // }
        // if(ay5 != null){
        //     if(ay5 != ""){
        //     if(ay5 < 5 || ay5 > 150){
        //         alert("Expected yield should be in the range of 5(tons/ha) to 150(tons/ha) ")
        //         return
        //     }
        // }
        // }
        if(et1 != null){
            if(et1 != ""){
                if(et1 < 100 || et1 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(et2 != null){
            if(et2 != ""){
                if(et2 < 100 || et2 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(et3 != null){
            if(et3 != ""){
                if(et3 < 100 || et3 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(et4 != null){
            if(et4 != ""){
                if(et4 < 100 || et4 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(et5 != null){
            if(et5 != ""){
                if(et5 < 100 || et5 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(aie != null ){
            if(aie != ""){
                if(aie> 100 || aie < 50){
                    alert("Irrigation Efficieny should be between 50% to 100%")
                    return
                }
            }
        }
        if(aie == null || aie == ""){
            if(ait == 1){
                aie = 68
            }
            else if (ait == 2){
                aie = 83
            }
            else if (ait == 3){
                aie = 73
            }
            else if (ait == 4){
                aie = 73
            }
            else if (ait == 5){
                aie = 78
            }
            else if (ait == 6){
                aie = 70
            }
            else if (ait == 7){
                aie = 82
            }
            else if (ait == 8){
                aie = 70
            }
            else if (ait == 9){
                aie = 81
            }
            else if (ait == 10){
                aie = 73
            }
            else if (ait == 11){
                aie = 80
            }
            else if (ait == 12){
                aie = 86
            }
            else{
                aie = 68
            }
        }
        setginfo('Crop Yield (tons/ha)') 
        setbgc('#9acd32')
        let Ya = 0;
        let ans_arr = [];
        let my_arr = [ayv1, ayv2, ayv3, ayv4, ayv5]
        let y_arr = [ay1, ay2, ay3, ay4, ay5]
        let etm_arr = [et1, et2, et3, et4, et5]
        let imt_arr = [imt1,imt2,imt3,imt4,imt5]
        while(ais.length > 0) {
            ais.pop();
        }
        for(let i=0;i<my_arr.length;i++){
            let eci =0;
            let ecw =0;
            let ETm =0;
            let ky = 0;
            let Ym = 0;
            let Eta = 0;
            let temp = 1;
            let lr = 0;
            let aiw3 = 0;
            let wsp =0;
            if (y_arr[i] == ""){
                y_arr[i] = null
            }
            if (etm_arr[i] == ""){
                etm_arr[i] = null
            }
            if (my_arr[i] == 1){
                eci = 2;
                ecw = ad_ec ?? 1.2;
                ETm= etm_arr[i] ?? 1500;
                ky = 1;
                Ym = y_arr[i] ?? 23;
                if ( Ym > 30 || Ym < 15){
                    alert("The maximum expected yield for Alfalfa should be between 15(tons/ha) to 30(tons/ha)")
                    return
                }
               }
            else if ( my_arr[i] == 2){
               eci=7;
               ecw= ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 1050;
               ky = 0.85;
               Ym = y_arr[i] ?? 120;
               if ( Ym > 140 || Ym < 100){
                alert("The maximum expected yield for Sugar beets should be between 100(tons/ha) to 140(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 3){
               eci=6;
               ecw= ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 620;
               ky = 1.05;
               Ym = y_arr[i] ??  7.5;
               if ( Ym > 10 || Ym < 5){
                alert("The maximum expected yield for Wheat should be between 5(tons/ha) to 10(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 4){
               eci=6.9;
               ecw= ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 1300;
               ky = 0.9;
               Ym = y_arr[i] ?? 19;
               if ( Ym > 25 || Ym < 15){
                alert("The maximum expected yield for Bermuda Grass should be between 15(tons/ha) to 25(tons/ha)")
                return
            }
            }
            else if (my_arr[i] ==5 ){
               eci=4;
               ecw=  ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 1350;
               ky = 0.9;
               Ym = y_arr[i] ??24;
               if ( Ym > 30 || Ym < 20){
                alert("The maximum expected yield for Klein Grass should be between 20(tons/ha) to 30(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 6){
               eci=2.8;
               ecw= ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 800;
               ky = 0.9;
               Ym = y_arr[i] ?? 14;
               if ( Ym > 20 || Ym < 10){
                alert("The maximum expected yield for Sudan Grass should be between 10(tons/ha) to 20(tons/ha)")
                return
            }
            }
            else if (my_arr[i] ==7 ){
                eci=1.3;
                ecw= ad_ec ?? 1.2;
                ETm= etm_arr[i] ?? 320;
                ky = 1.15;
               Ym =  y_arr[i] ?? 20;
               if ( Ym > 30 || Ym < 10){
                alert("The maximum expected yield for Lettuce should be between 10(tons/ha) to 30(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 8){
              eci=1;
              ecw= ad_ec ?? 1.2;
              ETm= etm_arr[i] ?? 600;
              ky = 1.1;
              Ym = y_arr[i] ?? 110;
              if ( Ym > 130 || Ym < 90){
                alert("The maximum expected yield for Carrots should be between 90(tons/ha) to 130(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 9){
               eci=2.8;
               ecw= ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 350;
               ky = 1;
               Ym = y_arr[i] ?? 15;
               if ( Ym > 20 || Ym < 10){
                alert("The maximum expected yield for Broccoli should be between 10(tons/ha) to 20(tons/ha)")
                return
            }
            }
            else if (my_arr[i] == 10){
              eci=1.2;
              ecw=ad_ec ?? 1.2;
              ETm= etm_arr[i] ?? 800;
              ky = 1.1;
               Ym = y_arr[i] ?? 60;
               if ( Ym > 70 || Ym <50){
                alert("The maximum expected yield for Onions should be between 50(tons/ha) to 70(tons/ha)")
                return
            }
            }
            else if (my_arr[i] ==11 ){
               eci=2;
               ecw=ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 200;
               ky = 1.15;
               Ym = y_arr[i] ?? 14;
               if ( Ym > 20 || Ym <10){
                alert("The maximum expected yield for Spinach should be between 10(tons/ha) to 20(tons/ha)")
                return
            }
            }
            else if (my_arr[i] ==12 ){
              eci=1.7;
              ecw= ad_ec ?? 1.2;
              ETm= etm_arr[i] ?? 600;
              ky = 1.1;
               Ym = y_arr[i] ?? 27;
               if ( Ym > 40 || Ym < 20){
                alert("The maximum expected yield for Sweet Corn should be between 20(tons/ha) to 40(tons/ha)")
                return
            }
            }
            else{
                Ym = 0;
                temp = 0;
            }
            // console.log(Ym)
            lr = ecw/((5*eci) - ecw)
            aiw3= (ETm )/((aie/100)*(1-lr))
            if(weca > aiw3){
                Eta = weca * (aie/100) * (1-(ecw/((5*eci) - ecw)))
                Ya = Ym * ((ky*((Eta/ETm)-1)+1))
            }
            else{
                Eta = weca * (aie/100) 
                Ya = Ym * ((ky*((Eta/ETm)-1)+1))
            }
            
            console.log(Ya)
            if (Ya>Ym){
                Ya = Ym
            }
            if(weca == 0){
                Ya = 0
            }
            // setans([...ans,Ya]);
            ans_arr.push(Number(Ya).toFixed(1))
            wsp = ((weca - aiw3) / weca) * temp
            if ((weca *(aie/100)) < ETm){
                // let value = 0;
                // value = ((ETm - (weca*(aie/100)))/ETm) *100
                imt_arr[i]= "There may be yield reduction as deficit irrigation of " + (((ETm - weca *(aie/100)) * 100) / ETm).toFixed(0) +"% is practiced"
            }
            else if ((weca *(aie/100) > ETm) && (weca < aiw3)){
                imt_arr[i] ="Not enough water for leaching. There could be yield reduction because of salinity build up."
            }
            else if (aiw3 == weca ){
                imt_arr[i] ="Maximum yield could be achieved, since IE, ET and leaching requirements are fulfilled."
            }
            else if ( weca > aiw3 ){
                imt_arr[i]=(wsp*100).toFixed(0) + "% of the water can be conserved and still maximum yield could be obtained."
            }
            else{
                imt_arr[i] = " "
            }
        }
        setais(ans_arr)
        setimt1(imt_arr[0])
        setimt2(imt_arr[1])
        setimt3(imt_arr[2])
        setimt4(imt_arr[3])
        setimt5(imt_arr[4])
    }
    function mweap(){
        if (weca == null){
            alert("Please enter the total water available for irrigation (mm)")
            return
        }
        if (weca == ""){
            alert("Please enter the total water available for irrigation (mm)")
            return
        }
        if (weca != null && weca != ""){
            if(weca< 0 || weca > 5500){
                alert("Total water available for irrigation should be between 0 mm and 5500 mm")
                return
            }
        }
        if(ad_ec != ""){
            if(ad_ec!= null){
                if(ad_ec< 0 || ad_ec>2){
                    alert("Irrigation water salinity should be between 0(dS/m) to 2(dS/m)")
                    return
                }
            }
        }
        else if (ad_ec == ""){
            ad_ec = null
        }
        if(et1 != null){
            if(et1 != ""){
                if(et1 < 100 || et1 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(et2 != null){
            if(et2 != ""){
                if(et2 < 100 || et2 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(et3 != null){
            if(et3 != ""){
                if(et3 < 100 || et3 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(et4 != null){
            if(et4 != ""){
                if(et4 < 100 || et4 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(et5 != null){
            if(et5 != ""){
                if(et5 < 100 || et5 > 2000){
                    alert("ETm should be in the range of 100mm to 2000mm")
                    return
                }
            }
        }
        if(aie != null ){
            if(aie != ""){
                if(aie> 100 || aie < 50){
                    alert("Irrigation Efficieny should be between 50% to 100%")
                    return
                }
            }
        }
        if(aie == null || aie == ""){
            if(ait == 1){
                aie = 68
            }
            else if (ait == 2){
                aie = 83
            }
            else if (ait == 3){
                aie = 73
            }
            else if (ait == 4){
                aie = 73
            }
            else if (ait == 5){
                aie = 78
            }
            else if (ait == 6){
                aie = 70
            }
            else if (ait == 7){
                aie = 82
            }
            else if (ait == 8){
                aie = 70
            }
            else if (ait == 9){
                aie = 81
            }
            else if (ait == 10){
                aie = 73
            }
            else if (ait == 11){
                aie = 80
            }
            else if (ait == 12){
                aie = 86
            }
            else{
                aie = 68
            }
        }
        setginfo('Water saving potential (% of total water available for irrigation)') 
        setbgc(`#6495ed`)
        let ans_arr = [];
        let my_arr = [ayv1, ayv2, ayv3, ayv4, ayv5]
        let y_arr = [ay1, ay2, ay3, ay4, ay5]
        let etm_arr = [et1, et2, et3, et4, et5]
        let imt_arr = [imt1,imt2,imt3,imt4,imt5]
        while(ais.length > 0) {
            ais.pop();
        }
        while(imt_arr.length > 0) {
            imt_arr.pop();
        }
        for(let i=0;i<my_arr.length;i++){
            let eci =0;
            let ecw =0;
            let ETm =0;
            let ky = 0;
            let Ym = 0;
            let Eta = 0;
            let temp = 1;
            let lr = 0;
            let aiw3 = 0;
            let wsp =0;
            if (y_arr[i] == ""){
                y_arr[i] = null
            }
            if (etm_arr[i] == ""){
                etm_arr[i] = null
            }
            if (my_arr[i] == 1){
                eci = 2;
                ecw = ad_ec ?? 1.2;
                ETm= etm_arr[i] ?? 1500;
                ky = 1;
                Ym = y_arr[i] ?? 23;
               }
            else if ( my_arr[i] == 2){
               eci=7;
               ecw= ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 1050;
               ky = 0.85;
               Ym =y_arr[i] ?? 120;
            }
            else if (my_arr[i] == 3){
               eci=6;
               ecw= ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 620;
               ky = 1.05;
               Ym = y_arr[i] ?? 7.5;
            }
            else if (my_arr[i] == 4){
               eci=6.9;
               ecw=ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 1300;
               ky = 0.9;
               Ym = y_arr[i] ?? 19;
            }
            else if (my_arr[i] ==5 ){
               eci=4;
               ecw=  ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 1350;
               ky = 0.9;
               Ym = y_arr[i] ?? 24;
            }
            else if (my_arr[i] == 6){
               eci=2.8;
               ecw= ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 800;
               ky = 0.9;
               Ym =y_arr[i] ?? 14;
            }
            else if (my_arr[i] ==7 ){
                eci=1.3;
                ecw= ad_ec ?? 1.2;
                ETm= etm_arr[i] ?? 320;
                ky = 1.15;
               Ym = y_arr[i] ?? 20;
            }
            else if (my_arr[i] == 8){
              eci=1;
              ecw= ad_ec ?? 1.2;
              ETm= etm_arr[i] ?? 600;
              ky = 1.1;
              Ym = y_arr[i] ?? 110;
            }
            else if (my_arr[i] == 9){
               eci=2.8;
               ecw= ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 350;
               ky = 1;
               Ym = y_arr[i] ?? 15;
            }
            else if (my_arr[i] == 10){
              eci=1.2;
              ecw=ad_ec ?? 1.2;
              ETm= etm_arr[i] ?? 800;
              ky = 1.1;
               Ym = y_arr[i] ?? 60;
            }
            else if (my_arr[i] ==11 ){
               eci=2;
               ecw=ad_ec ?? 1.2;
               ETm= etm_arr[i] ?? 200;
               ky = 1.15;
               Ym =y_arr[i] ?? 14;
            }
            else if (my_arr[i] ==12 ){
              eci=1.7;
              ecw= ad_ec ?? 1.2;
              ETm= etm_arr[i] ?? 600;
              ky = 1.1;
               Ym = y_arr[i] ?? 27;
            }
            else{
                Ym = 0;
                temp = 0;
            }
            lr = ecw/((5*eci) - ecw)
            aiw3= (ETm )/((aie/100)*(1-lr))
            wsp = ((weca - aiw3) / weca) * temp
            console.log(weca)
            console.log(aiw3)
            if ( wsp < 0){
                wsp = 0
            }
            // console.log(wsp)

            ans_arr.push(Number((wsp*100)).toFixed(0))
            if ((weca *(aie/100)) < ETm){
                // let value = 0;
                // value = ((ETm - (weca*(aie/100)))/ETm) *100
                imt_arr[i]= "There may be yield reduction as deficit irrigation of " + (((ETm - weca *(aie/100)) * 100) / ETm).toFixed(0) +"% is practiced"
            }
            else if ((weca *(aie/100) > ETm) && (weca < aiw3)){
                imt_arr[i] ="Not enough water for leaching. There could be yield reduction because of salinity build up."
            }
            else if (aiw3 == weca ){
                imt_arr[i] ="Maximum yield could be achieved, since IE, ET and leaching requirements are fulfilled."
            }
            else if ( weca > aiw3 ){
                imt_arr[i]= (wsp*100).toFixed(0) + "% of the water can be conserved and still maximum yield could be obtained."
            }
            else{
                imt_arr[i] = " "
            }
        }
        setais(ans_arr)
        
        setimt1(imt_arr[0])
        setimt2(imt_arr[1])
        setimt3(imt_arr[2])
        setimt4(imt_arr[3])
        setimt5(imt_arr[4])
    }
  
      
    return (
        <div className='home'>
            <div className='mainhead'>
                <h2>Crop-specific Irrigation Recommendation</h2>
                <p>Select a crop and click on the button below to find out the maximum yield and irrigation water requirements.</p>
                <p>If known, users are encouraged to enter the salinity of irrigation water, soil type,
                and irrigation system/ efficiency to obtain the results for the actual scenario. If not
                known, the default irrigation water salinity, soil texture and irrigation efficiency
                used are 1.2dS/m, sandy loam type, and 68% (for flood irrigation system), respectively.</p>
                <p>Leaching requirements are calculated using two methods (the standard method and
                    the SALEACH method). For irrigation water demand, the leaching requirements based
                    on the standard method are considered. Deficit irrigation graph shows the % of
                    the maximum yield that might be reduced if the deficit irrigation is practiced by 10-50%.</p>
            </div>
            <div className='r0'>
                <div className='cardr0'>
                <div className='crop-image'>
                <img src={crop} />   
                <p> Crop</p>
                </div>
                <div className = "crop_details ">
                <p className = "input">
                    <Select 
                    onChange={(opt)=>{
                    let val=opt.value;
                    console.log(opt.label, opt.value)
                    setPa(val)
                    }
                    }
                    options ={crops}
                    //onChange={opt => console.log(opt.label, opt.value)}
                    />
                </p> 
                </div>
                </div>

                <div className='cardr0'>
                    <div className='drop-image'>
                        <img src={drop} />   
                        <p> Irrigation Water Salinity</p>
                    </div>
                    <div className = "crop_details ">
                        <p className = "input">
                    
                        </p> 
                        <p><form>
                        <label>Water EC (dS/m):{' '}
                        <input type="number" placeholder = "(dS/m)" style={{width: "55px"}} onChange = {e => setecw(e.target.value)}/>
                        </label>
                    </form></p>
                    </div>
            
                </div>

                <div className='cardr0'>
            <div className='soil-image'>
            <img src={soil} />   
            <p> Soil Texture</p>
            </div>
            <div className = "crop_details ">
            <p className = "input">
            <Select
            options ={soily}
            onChange={(opt)=>{
                let val=opt.value;
                console.log(opt.label, opt.value)
                setst(val)
                }
                } />
            </p> 
            <p><small> <a href="https://casoilresource.lawr.ucdavis.edu/gmap/" target="_blank"> Look up soil map</a></small></p>
            </div>
                </div>

                <div className='cardr0'>
                    <div className='irrigation-image'>
                    <img src={irrigation} />   
                    <p> Irrigation System</p>
                    </div>
                    <div className = "crop_details ">
                    <p className = "input">
                    <Select id = "is"
                    options ={itype}
                    onChange={(opt)=>{
                        let val=opt.value;
                        console.log(opt.label, opt.value)
                        setit(val)
                        }
                        } />
                    </p> 
                    <p className="if"><form>
                    <label>Irrigation Efficiency (%):{' '}
                    <input type="number" placeholder = "%" style={{width: "50px"}} onChange = {e => setie(e.target.value)}/>
                    </label>
                    </form>
                    </p>
                    </div>
                </div>
            </div>
            <div className='fob'><button className="gooey-button" onClick = {clr}>Find out yield and crop requirements</button></div>
            <div className='r1'>
                <div className='c0'>
                    <div className='ay'>
                        <h2>Maximum Yield</h2>
                        <div className='eto'><p>{y} (tons/ha)</p></div>
                    </div>
                    <div className='di'>
                    <h2>Deficit Irrigation</h2>
                    
                    <h5>X-axis: Deficit irrigation (% of full irrigation), Y-axis: Yield Reduction(% of maximum yield)</h5>
                    <div className="graphdi" >
                    <Paper className="graph1" >
                    <Chart 
                        data={datadf}
                        
                    >
                        <ArgumentAxis  />
                        <ValueAxis  />
                    
                        <BarSeries valueField="value" argumentField="argument" />
                        </Chart>
                    </Paper>
                    </div>
                    </div>
                </div> 
                <div className='c1'> 
                    <div className = "lr">
                    <h2> Leaching and Irrigation Water Requirement</h2>
                        <div className='lrp'>
                            <div className='nlr'>
                                {pa.myPaVal}
                                <div className='cb'>
                                <div className='lrl'><p>Leaching Requirement (Standard method):</p></div>
                                <div className="Default">
                                <CircularProgressbar value={c} text={`${c}%`} style={{ width: 400, height: 400 }} />
                                </div>
                                </div>
                            </div>
                            <div className='nlr'>
                                {pa.myPaVal}
                                <div className='cb'>
                                <div className='lrl'><p>Leaching Requirement (SALEACH method):</p></div>
                                <div className="Default">
                                <CircularProgressbar value={d} text={`${d}%`} />
                                </div>
                                </div>
                            </div>
                        </div>
                    <div className='twgraph'><Bar
                    data={datatw}
                    options={{
                        indexAxis: 'y',
                        title:{
                        display:true,
                        fontSize:2,
                        },
                        /*scales: {x: { title: { display: true, text: 'seconds'}}},*/
                    }
                }
                    /></div>
                    <div className='graphdes'>
                    <div className='gdes'><h9>LRw -> Total water required for leaching</h9></div>
                    <div className='gdes'><h9>ET -> Evapotranspiration for maximum yield </h9></div>
                    <div className='gdes'><h9>IEw -> Water required to meet the Irrigation Efficiency demands</h9></div>
                    <div className='gdes'><h9>IWR -> Total water requirement based on ET, IE and LR</h9></div>
                    </div>
                    <div className='saleach'>
                    <h3>Want to know more about Leaching related Yield Reduction?</h3>
                    <p>Follow the link below</p>
                    <a href="https://salinity.ucr.edu/Sindex.html" target="_blank"> SALEACH</a>
                    </div>
                    </div>  
                </div> 
            </div>
            <div className="sep">
            <ColoredLine color="black" />
            </div>
            <div className='ads'>
                <div className='mainhead'>
                    <h2>Optimum Crop Selection</h2>
                    <p>Enter the total water available for irrigation and select up to five crops to run the irrigation and crop
                    optimization in terms of crop yield, profit and water saving potential while achieving
                    the maximum yield. Irrigation efficiency, crop evapotranspiration and leaching
                    requirements based on the water salinity are considered for the optimization.</p>
                    <p>If known for the field, users can enter the irrigation water salinity and irrigation efficiency to
                    obtain the results for the actual scenario. Else, the default values of irrigation water salinity
                    and irrigation efficiency used are 1.2dS/m, and 68% (for flood irrigation system), respectively. For the selected crops,
                    users are encouraged to use the maximum expected yield, evapotranspiration for the maximum
                    yield, updated crop prices and site-specific production cost for accurate results.</p>
                    <p>Crop prices from the USDA and the 2021 California state agriculture overview are used as default.
                    (Sources - <a href = "https://www.nass.usda.gov/Publications/Todays_Reports/reports/agpr0721.pdf" target="_blank"> link 1</a> ,
                    
                    <a href = "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=CALIFORNIA" target="_blank"> link 2</a>)</p>
                    <p><a href="https://www.barchart.com/futures/grains" target="_blank"> Look up recent crop price</a></p>
                </div>
                
                <div className='atop'>
                    <div className='card1'>
                            <div className='crop-image'>
                            <img src={drop} />   
                            <p>Water related Inputs</p>
                            </div>
                    <p><form>
                    <label>Total water available for irrigation (mm)*:{' '}
                    <input type="number" placeholder = "(mm)" style={{width: "55px"}} onChange = {e => setweca(e.target.value)}/>
                    </label>
                    </form></p>
                <p><form>
                    <label>Irrigation water salinity (dS/m):{' '}
                    <input type="number" placeholder = "(dS/m)" style={{width: "55px"}} onChange = {e => setad_ec(e.target.value)}/>
                    </label>
                </form></p>
                    </div>
                    <div className='card2'>
                        <div className='irrigation-image'>
                        <img src={irrigation} />  
                        <p> Irrigation System</p> 
                        </div>
                        <div className = "crop_details ">
                        <p className = "input">
                        <Select id = "is"
                        options ={itype}
                        onChange={(opt)=>{
                            let val=opt.value;
                            console.log(opt.label, opt.value)
                            setait(val)
                            }
                            } />
                        </p> 
                        <p className="if"><form>
                        <label>Irrigation Efficiency (%):{' '}
                        <input type="number" placeholder = "%" style={{width: "50px"}} onChange = {e => setaie(e.target.value)}/>
                        </label>
                        </form>
                        </p>
                        </div>
                    </div>
                </div>
                <div className='adsi'>
                    <div className='f1'>
                        <div className='aco'><h4>Crop</h4></div>
                        <div className='aey'><h5>Maximum expected yield (tons/ha)</h5></div>
                        <div className='aetm'><h5>ET for maximum expected yield (mm)</h5></div>
                        <div className='acc'>
                            <h5>Crop Price ($/ton)</h5>
                        </div>
                        <div className='apc'><h5>Production Cost ($/ha)</h5></div>
                    </div>
                    <div className='f1'>
                    <p> Crop 1</p>
                    <div className='adoc'>
                        <Select 
                        autosize={false}
                        styles={{width: '120px !important'}}
                        onChange={(opt)=>{
                        let val=opt.label;
                        let val1 = opt.value;
                        console.log(opt.label, opt.value)
                        setai1(val)
                        setayv1(val1)
                        }
                        }
                        options ={crops}
                        //onChange={opt => console.log(opt.label, opt.value)}
                        />
                    </div>
                    <div className='adpn'> <input type="number" placeholder = "Expected yield (tons/ha)" style={{width: "160px"}} onChange = {e => setay1(e.target.value)}/></div>
                    <div className='adpn2'> <input type="number" placeholder = "ETm (mm)" style={{width: "100px"}} onChange = {e => setet1(e.target.value)}/></div>
                    <div className='adpn3'> <input type="number" placeholder = "Crop Price ($/ton)" style={{width: "120px"}} onChange = {e => setc1(e.target.value)}/></div>
                    <div className='adpn4'> <input type="number" placeholder = "Production cost ($/ha)" style={{width: "145px"}} onChange = {e => setpc1(e.target.value)}/></div>
                    </div>
                    <div className='f1'>
                    <p> Crop 2</p>
                    <div className='adoc'>
                        <Select 
                        onChange={(opt)=>{
                        let val=opt.label;
                        let val1 = opt.value;
                        console.log(opt.label, opt.value)
                        setai2(val)
                        setayv2(val1)
                        }
                        }
                        options ={crops}
                        //onChange={opt => console.log(opt.label, opt.value)}
                        />
                    </div>
                    <div className='adpn'> <input type="number" placeholder = "Expected yield (tons/ha)" style={{width: "160px"}} onChange = {e => setay2(e.target.value)}/></div>
                    <div className='adpn2'> <input type="number" placeholder = "ETm (mm)" style={{width: "100px"}} onChange = {e => setet2(e.target.value)}/></div>
                    <div className='adpn'> <input type="number" placeholder = "Crop Price ($/ton)" style={{width: "120px"}} onChange = {e => setc2(e.target.value)}/></div>
                    <div className='adpn'> <input type="number" placeholder = "Production cost ($/ha)" style={{width: "145px"}} onChange = {e => setpc2(e.target.value)}/></div>
                    </div>
                    <div className='f1'>
                    <p> Crop 3</p>
                    <div className='adoc'>
                        <Select 
                        onChange={(opt)=>{
                        let val=opt.label;
                        let val1=opt.value;
                        console.log(opt.label, opt.value)
                        setai3(val)
                        setayv3(val1)
                        }
                        }
                        options ={crops}
                        //onChange={opt => console.log(opt.label, opt.value)}
                        />
                    </div>
                    <div className='adpn'> <input type="number" placeholder = "Expected yield (tons/ha)" style={{width: "160px"}} onChange = {e => setay3(e.target.value)}/></div>
                    <div className='adpn2'> <input type="number" placeholder = "ETm (mm)" style={{width: "100px"}} onChange = {e => setet3(e.target.value)}/></div>
                    <div className='adpn'> <input type="number" placeholder = "Crop Price ($/ton)" style={{width: "120px"}} onChange = {e => setc3(e.target.value)}/></div>
                    <div className='adpn'> <input type="number" placeholder = "Production cost ($/ha)" style={{width: "145px"}} onChange = {e => setpc3(e.target.value)}/></div>
                    </div>
                    <div className='f1'>
                    <p> Crop 4</p>
                    <div className='adoc'>
                        <Select 
                        onChange={(opt)=>{
                        let val=opt.label;
                        let val1=opt.value;
                        console.log(opt.label, opt.value)
                        setai4(val)
                        setayv4(val1)
                        }
                        }
                        options ={crops}
                        //onChange={opt => console.log(opt.label, opt.value)}
                        />
                    </div>
                    <div className='adpn'> <input type="number" placeholder = "Expected yield (tons/ha)" style={{width: "160px"}} onChange = {e => setay4(e.target.value)}/></div>
                    <div className='adpn2'> <input type="number" placeholder = "ETm (mm)" style={{width: "100px"}} onChange = {e => setet4(e.target.value)}/></div>
                    <div className='adpn'> <input type="number" placeholder = "Crop Price ($/ton)" style={{width: "120px"}} onChange = {e => setc4(e.target.value)}/></div>
                    <div className='adpn'> <input type="number" placeholder = "Production cost ($/ha)" style={{width: "145px"}} onChange = {e => setpc4(e.target.value)}/></div>
                    </div>
                    <div className='f1'>
                    <p> Crop 5</p>
                    <div className='adoc'>
                        <Select 
                        onChange={(opt)=>{
                        let val=opt.label;
                        let val1=opt.value;
                        console.log(opt.label, opt.value)
                        setai5(val)
                        setayv5(val1)
                        }
                        }
                        options ={crops}
                        //onChange={opt => console.log(opt.label, opt.value)}
                        />
                    </div>
                    <div className='adpn'> <input type="number" placeholder = "Expected yield (tons/ha)" style={{width: "160px"}} onChange = {e => setay5(e.target.value)}/></div>
                    <div className='adpn2'> <input type="number" placeholder = "ETm (mm)" style={{width: "100px"}} onChange = {e => setet5(e.target.value)}/></div>
                    <div className='adpn'> <input type="number" placeholder = "Crop Price ($/ton)" style={{width: "120px"}} onChange = {e => setc5(e.target.value)}/></div>
                    <div className='adpn'> <input type="number" placeholder = "Production cost ($/ha)" style={{width: "145px"}} onChange = {e => setpc5(e.target.value)}/></div>
                    </div>
                </div>
                
                <div>
                    <button className="gooey-button" style = {{marginLeft:"1%" , marginTop:"1%" }} onClick = {yap}> Compare Yield </button>
                    <button className="gooey-button" style = {{marginLeft:"1%" , marginTop:"1%"}} onClick = {rap}> Compare Profit </button>
                    <button className="gooey-button" style = {{marginLeft:"1%" , marginTop:"1%" }} onClick = {mweap}>Compare Water saving potential</button>
                </div>
                <div className='adout'>
                    <div className='graph'>
                    <Bar
                    data={dataap}
                    options={{
                        title:{
                        display:true,
                        fontSize:20
                        },
                    }}
                    />
                    </div>
                    <div>
                    <h2>Irrigation Management Tip</h2>
                    <div className='csout'>
                    <p>Crop 1 -> {imt1}</p>
                    <p>Crop 2 -> {imt2}</p>
                    <p>Crop 3 -> {imt3}</p>
                    <p>Crop 4 -> {imt4}</p>
                    <p>Crop 5 -> {imt5}</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home


// const crops = [{label: "abc", value: 1}]
// crops.forEach(crops)
// array.map()
// array.forEach()

