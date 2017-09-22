// File: ./frontend/src/views/PhotoView.js

import React from 'react'
import { gql, graphql } from 'react-apollo'

const query = gql`
query PhotoView($id: ID!) {
	message(id: $id) {
		id, creationDate, message
	}
}
`

class PhotoView extends React.Component {
	render() {
		let { data } = this.props
		if (data.loading || !data.message) {
			return <div>Loading ...</div>
		}
		return (
			<div>
				<h1>Message {data.message.id}</h1>
				<p>{data.message.creationDate}</p>
				<p>{data.message.message}</p>
				<figure>
					<img src="http://via.placeholder.com/480x360" alt=""></img>
					<figcaption>Post 1</figcaption>
				</figure>
			</div>

		)
	}
}

const queryOptions = {
	options: props => ({
		variables: {
			id: props.match.params.id,
		},
	}),
}

PhotoView = graphql(query, queryOptions)(PhotoView)
export default PhotoView