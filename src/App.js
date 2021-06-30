import { useEffect, useState, useRef } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import './App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

const App = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [longitude, setLongitude] = useState(110.21778)
  const [latitude, setLatitude] = useState(-7.47056)

  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_TOM_TOM_API_KEY,
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true
      },
      center: [longitude, latitude],
      zoom: 14
    })

    setMap(map)

    const addMarker = () => {
      const element = document.createElement('div')
      element.className = 'marker'

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map)

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat()
        setLongitude(lngLat.lng)
        setLatitude(lngLat.lat)
      })
    }

    addMarker()

    return () => map.remove()

  }, [latitude, longitude])

  return (
    <>
      {map && (
        <div className="App">
          <div ref={mapElement} className="map" />
          <div className="search-bar">
            <h1>Where to?</h1>
            <input
              type="text"
              id="longitude"
              className="longitude"
              placeholder="Put the Longitude"
              onChange={(e) => { setLongitude(e.target.value) }}
            />
            <input
              type="text"
              id="latitude"
              className="latitude"
              placeholder="Put the Latitude"
              onChange={(e) => { setLatitude(e.target.value) }}
            />
          </div>
        </div>
      )
      }
    </>

  )
}

export default App
