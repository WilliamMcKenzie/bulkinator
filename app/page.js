'use client'
import Image from 'next/image'
import styles from './modulestyle/home.module.css'
import DrawerAppBar from './components/Navbar'
import { useEffect, useReducer, useRef, useState } from 'react'


export default function Home() {

  const [id, setId] = useState("none")

  useEffect(() => {
    let params = (new URL(document.location)).searchParams;
    setId(params.get("id"))
    history.replaceState({}, null, "/");
  }, [])

  return (
    <main className={styles.main}>
      <DrawerAppBar id={id}></DrawerAppBar>

      <div className={styles.center_background}></div>
      <div className={styles.center}>
        <div className={styles.center_header}>
          <h1>
            Eat massive
            <br />
            <code className={styles.highlighted}>Lift massive</code>
          </h1>
          <p>
            Bulkinator is a workout and meal planner designed to optimize muscle growth on the bulk, sign up now to get huge in no time.
          </p>
        </div>
        <svg class="svg-standalone-icon" width="100%" viewBox="202.66064399439546 114.99999999999997 144.67871201120903 144.67871201120906" xmlns="http://www.w3.org/2000/svg">
          <g data-paper-data="{&quot;isIcon&quot;:&quot;true&quot;,&quot;iconType&quot;:&quot;icon&quot;,&quot;rawIconId&quot;:&quot;3592574&quot;,&quot;selectedEffects&quot;:{&quot;container&quot;:&quot;&quot;,&quot;transformation&quot;:&quot;&quot;,&quot;pattern&quot;:&quot;&quot;},&quot;isDetailed&quot;:false,&quot;fillRule&quot;:&quot;evenodd&quot;,&quot;bounds&quot;:{&quot;x&quot;:202.66064399439546,&quot;y&quot;:114.99999999999997,&quot;width&quot;:144.67871201120903,&quot;height&quot;:144.67871201120906},&quot;iconStyle&quot;:&quot;standalone&quot;,&quot;suitableAsStandaloneIcon&quot;:true}" fill-rule="evenodd">
            <path d="M344.13959,208.68473c-10.2879,3.34154 -21.60865,7.91845 -34.24576,13.6092c-48.09635,21.65746 -73.51193,-2.92334 -73.89429,-3.31643c15.15157,16.46308 55.42851,33.73258 95.88772,13.03729c-4.00985,5.10345 -8.66776,9.63985 -13.89272,13.50794c-25.6185,5.89327 -41.84018,-0.32403 -41.84018,-0.32403c6.33881,3.46305 16.84948,7.16913 32.03831,6.41981c-9.94362,5.14395 -21.22387,8.06021 -33.19267,8.06021c-39.95676,0 -72.33936,-32.3826 -72.33936,-72.33936c0,-39.95676 32.3826,-72.33936 72.33936,-72.33936c39.95676,0 72.33936,32.3826 72.33936,72.33936c0,7.43241 -1.11385,14.60153 -3.19978,21.34538zM271.96225,130.49261c-26.7121,0 -48.3815,21.68965 -48.3815,48.40175c0,26.73235 21.66941,48.40175 48.3815,48.44226c9.74111,0 18.8139,-2.87575 26.40832,-7.85769c-4.59715,1.66064 -9.57909,2.59223 -14.7838,2.59223c-23.83635,0 -43.15654,-19.3202 -43.15654,-43.15654c0,-23.83635 19.3202,-43.15654 43.15654,-43.15654c5.20471,0 10.18665,0.91133 14.7838,2.59223c-7.59442,-4.98194 -16.66721,-7.85769 -26.40832,-7.85769zM312.68857,196.73618c3.66557,-5.56924 5.77175,-12.23207 5.77175,-19.38095c0,-19.60372 -15.9179,-35.52162 -35.54187,-35.52162c-19.64423,0 -35.54187,15.89764 -35.54187,35.52162c0,7.14888 2.10618,13.81172 5.77175,19.38095c-1.21511,-3.38205 -1.90367,-7.04762 -1.90367,-10.85495c0,-17.49754 14.17624,-31.67378 31.67378,-31.67378c17.49754,0 31.67378,14.17624 31.67378,31.67378c0,3.82758 -0.66831,7.47291 -1.90367,10.85495z" data-paper-data="{&quot;isPathIcon&quot;:true}" style={{fill: "#2196f3"}}/>
          </g>
        </svg>
      </div>

      <div className={styles.grid}>
        <a
          href={`./meals?id=${id}`}
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Find Meals <span>-&gt;</span>
          </h2>
          <p>Cook meals that work for you.</p>
        </a>
        <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          href={`./planner?id=${id}`}
        >
          <h2>
            Plan Diet<span>-&gt;</span>
          </h2>
          <p>Organization is power.</p>
        </a>
      </div>
    </main >
  )
}

