import { Suspense } from "react";
import {FullLoading} from '../ui-componets'
import React from 'react'

const LoadablePage = (Component) => (props) =>
    (
        <Suspense fallback={<FullLoading />} >
            <Component {...props} />
        </Suspense>
    );

export default LoadablePage;