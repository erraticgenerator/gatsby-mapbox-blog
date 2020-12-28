import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import bbox from "@turf/bbox"
import { multiPoint } from "@turf/helpers"
import Markers from "./markers"
import "mapbox-gl/dist/mapbox-gl.css"

// replace with your own Mapbox token
const MAPBOX_TOKEN = process.env.GATSBY_MAPBOX_TOKEN

const mapContainerStyle = {
  width: "100%",
  height: "120px",
}

const Map = props => {
  const mapContainerRef = useRef(null)

  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      // Empire State Building [lng, lat]
      center: [-73.9856, 40.7497],
      zoom: 10,
    })

    map.addControl(new mapboxgl.NavigationControl(), "top-right")

    setMap(map)

    return () => map.remove()
  }, [])

  useEffect(() => {
    if (!map) return

    if (props.places && props.places.length !== 0) {
      const coords = []
      props.places.forEach(place => {
        coords.push([place.longitude, place.latitude])
      })
      const feature = multiPoint(coords)
      const box = bbox(feature)

      map.fitBounds(
        [
          [box[0], box[1]],
          [box[2], box[3]],
        ],
        {
          padding: 40,
          maxZoom: 14,
          duration: 2000,
        }
      )
    } else {
      map.easeTo({
        center: [-73.9856, 40.7497],
        zoom: 10,
        duration: 2000,
      })
    }
  }, [map, props.places])

  return (
    <div ref={mapContainerRef} style={mapContainerStyle}>
      {props.places && map && <Markers map={map} places={props.places} />}
    </div>
  )
}

export default Map
