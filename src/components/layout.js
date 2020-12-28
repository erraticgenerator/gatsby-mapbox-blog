import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Map from "./map"
import PostList from './postList'

const Layout = props => {
  const children = props.children
  const [places, setPlaces] = useState([])

  useEffect(() => {
    if (props && props.data) {
      setPlaces(props.data.markdownRemark.frontmatter.places)
    } else {
      setPlaces([])
    }
  }, [props])

  return (
    <>
      <Map places={places} />
      <div style={{ margin: '0 40px' }}>
        <main>{children}</main>
        <PostList />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
