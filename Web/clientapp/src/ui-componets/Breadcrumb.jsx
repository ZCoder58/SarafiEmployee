import { Breadcrumbs, Hidden, Icon } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Breadcrumb = ({ routeSegments }) => {
    return (
        <div className="flex flex-wrap items-center" style={{ width:"100%" }}>
            {routeSegments ? (
                <Hidden xsDown>
                    <h4 className="m-0 pb-1px text-16 capitalize align-middle">
                        {routeSegments[routeSegments.length - 1]['name']}
                    </h4>
                    <h4 className="m-0 pb-3px ml-2 text-hint">|</h4>
                </Hidden>
            ) : null}
            <Breadcrumbs
                separator={<Icon className="text-hint">navigate_next</Icon>}
                className="flex items-center relative"
                sx={{ 
                    width:"100%"
                 }}
            >
                <NavLink to="/">
                    <Icon className="align-middle ml-2 mb-1" color="primary">
                        home
                    </Icon>
                </NavLink>
                {routeSegments
                    ? routeSegments.map((route, index) => {
                          return index !== routeSegments.length - 1 ? (
                              <NavLink key={index} to={route.path}>
                                  <span className="capitalize text-muted">
                                      {route.name}
                                  </span>
                              </NavLink>
                          ) : (
                              <span
                                  key={index}
                                  className="capitalize text-muted"
                              >
                                  {route.name}
                              </span>
                          )
                      })
                    : null}
            </Breadcrumbs>
        </div>
    )
}

export default Breadcrumb
