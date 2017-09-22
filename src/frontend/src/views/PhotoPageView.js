// File: ./frontend/src/views/PhotoPageView.js

import React from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import queryString from 'query-string'
import '../App.css'

const query = gql`	
query ListViewSearch($search: String, $endCursor: String) {
  allMessages(first: 2, message_Icontains: $search, after: $endCursor) {
    edges {
      node {
        id, message
      }
    },
    pageInfo {
      hasNextPage,
      hasPreviousPage,
      startCursor,
      endCursor
    }
  }
}
`

class PhotoPageView extends React.Component {
	handleSearchSubmit(e) {
		e.preventDefault()
		let data = new FormData(this.form)
		let query = `?search=${data.get('search')}`
		this.props.history.push(`/${query}`)
	}

	loadMore() {
		let { data, location } = this.props
		data.fetchMore({
			query: query,
			variables: {
				search: queryString.parse(location.search).search,
				endCursor: data.allMessages.pageInfo.endCursor,
			},
			updateQuery: (prev, next) => {
				const newEdges = next.fetchMoreResult.allMessages.edges
				const pageInfo = next.fetchMoreResult.allMessages.pageInfo
				return {
					allMessages: {
						edges: [...prev.allMessages.edges, ...newEdges],
						pageInfo,

					},
				}
			},
		})

	}
	render() {
		let { data } = this.props
		if (data.loading || !data.allMessages) {
			return <div>Loading ...</div>
		}
		return (
			<div>

				<div className="searchy">
				<form className="search"
					ref={ref => (this.form = ref)}
					onSubmit={e => this.handleSearchSubmit(e)}
				>
					<input type="text" name="search"  placeholder="Search"/>
					{/*<button type="submit">Search</button>*/}
				</form>
				</div>
				<h2>PhotoPageView</h2>
				{data.allMessages.pageInfo.hasNextPage &&
					<button onClick={() => this.loadMore()}>Load more ..</button>}
				<div className="clearfix"></div>
				<div className="clearfix"></div>

			<main>	
						{data.allMessages.edges.map(item => (
							<span href="a" title="Post 1"  key={item.node.id}>
							<article>
								{/*<p key={item.id}>*/}
								<p>
									<Link to={`/messages/${item.node.id}/`}>
										{item.node.message}
									</Link>
								</p>
								
							<figure>
								<img src="http://via.placeholder.com/480x360" alt=""></img>
								<figcaption>Post 1</figcaption>
							</figure>
							</article>
							</span>				
						))}
						
					
			</main>

			</div>
		)
	}
}

const queryOptions = {
	options: props => ({
		variables: {
			search: queryString.parse(props.location.search).search,
			endCursor: null,
		},
	}),
}

PhotoPageView = graphql(query, queryOptions)(PhotoPageView)
export default PhotoPageView