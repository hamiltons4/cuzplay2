import React from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import queryString from 'query-string'

import Masonry from 'react-masonry-component';

var masonryOptions = {
	transitionDuration: 0
};


const query = gql`	
query GalleryViewSearch($search: String, $endCursor: String) {
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



class GalleryView extends React.Component {
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
      return <div>Loading...</div>
    }


	var childElements = data.allMessages.edges.map(item => (
          <p key={item.node.id} >
            <Link to={`/messages/${item.node.id}/`} className="gallery">
              {item.node.message}
            </Link>
            <p>hi!</p>
          </p>
        ))
		

	return(
		<div>

		<div className="searchy">
        <form className="search"
          ref={ref => (this.form = ref)}
          onSubmit={e => this.handleSearchSubmit(e)}
        >
          <input type="text" name="search" placeholder="Search"/>
          {/*<button type="submit">Search</button>*/}
        </form>
        </div>
        {data.allMessages.pageInfo.hasNextPage &&
          <button onClick={() => this.loadMore()}>Load more...</button>}

		<Masonry
			className={'my-gallery-class'} //default ''
			elementType={'ul'} // default 'div'
			options={masonryOptions} // default {}
			disableImagesLoaded={false} // default false
			updateOnEachImageLoad={false} // default false and works only if disableImages loaded is false
		>
			{childElements}
		</Masonry>

		</div>
	)
}
}

GalleryView = graphql(query)(GalleryView)
export default GalleryView

