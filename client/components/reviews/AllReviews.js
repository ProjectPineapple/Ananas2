import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Tab} from 'semantic-ui-react'
import {fetchAllReviews} from '../../store/reviews'
import ReviewList from './ReviewList'

const AllReviews = props => {
  const reviews = useSelector(state => state.allReviews)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllReviews())
  })
  const panes = [
    {
      menuItem: {
        key: 'allReviews',
        icon: 'unordered list',
        content: 'All Reviews'
      },
      render: () => {
        return (
          <Tab.Pane>
            <ReviewList reviews={reviews} all={true} />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'oneStar',
        icon: 'star',
        content: `1-Star Reviews`
      },
      render: () => {
        const oneStarReviews = reviews.filter(review => review.stars === '1.00')
        return (
          <Tab.Pane>
            <ReviewList reviews={oneStarReviews} />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'twoStar',
        icon: 'star',
        content: `2-Star Reviews`
      },
      render: () => {
        const twoStarReviews = reviews.filter(review => review.stars === '2.00')
        return (
          <Tab.Pane>
            <ReviewList reviews={twoStarReviews} />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'threeStar',
        icon: 'star',
        content: `3-Star Reviews`
      },
      render: () => {
        const threeStarReviews = reviews.filter(
          review => review.stars === '3.00'
        )
        return (
          <Tab.Pane>
            <ReviewList reviews={threeStarReviews} />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'fourStar',
        icon: 'star',
        content: `4-Star Reviews`
      },
      render: () => {
        const fourStarReviews = reviews.filter(
          review => review.stars === '4.00'
        )
        return (
          <Tab.Pane>
            <ReviewList reviews={fourStarReviews} />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'fiveStar',
        icon: 'star',
        content: `5-Star Reviews`
      },
      render: () => {
        const fiveStarReviews = reviews.filter(
          review => review.stars === '5.00'
        )
        return (
          <Tab.Pane>
            <ReviewList reviews={fiveStarReviews} />
          </Tab.Pane>
        )
      }
    }
  ]

  return (
    <Tab menu={{fluid: true, vertical: true, tabular: true}} panes={panes} />
  )
}

export default AllReviews
