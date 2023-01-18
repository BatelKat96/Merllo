import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HomePageHeader } from '../cmps/home-page-header'



export function About() {

    return <section className="about">
                <HomePageHeader />
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
    </section>

}


// Currently - no solution for using ErrorBoundaries with react hooks:
// https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
// class MyErrorBoundary extends React.Component {
//     state = { error: null, errorInfo: null };

//     componentDidCatch(error, errorInfo) {
//         // Catch errors in children and re-render with error message
//         // Note: in development the error is still presented on screen and you need to ESC to see the fallback UI
//         this.setState({
//             error,
//             errorInfo
//         })
//         // TODO: Log error to an error reporting service
//         // logger.report(error)
//     }
//     render() {
//         if (this.state.errorInfo) {
//             // Error path
//             return (
//                 <div>
//                     <h2>Something went wrong.</h2>

//                     <details style={{ whiteSpace: 'pre-wrap' }}>
//                         {this.state.error && this.state.error.toString()}
//                         <br />
//                         {this.state.errorInfo.componentStack}
//                     </details>
//                 </div>
//             );
//         }
//         // Normally, just render children
//         return this.props.children;
//     }
// }
