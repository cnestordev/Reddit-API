import React from 'react';

class Item extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            data: ''
        }
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose() {
        this.setState({
            activated: false
        });
    }

    handleComments(id) {
        this.setState({
            isLoading: true
        })
        var newSub = 'https://www.reddit.com' + id.slice(0, -1) + '.json';
        fetch(newSub)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data,
                    activated: true,
                    isLoading: false
                });
            });
    }

    render() {
        let imgUrl;
        let imgClass;
        if (this.props.img.slice(-4) === ".jpg" || this.props.img.slice(-4) === ".gif") {
            imgUrl = this.props.img
        } else {
            imgUrl = "https://www.nextlevelfairs.com/assets/images/image-not-available.png";
            imgClass = "noPic"
        }

        if (this.state.isLoading) {
            return (
                <div className="cont commentSectionPh">
                    <div className="subreddit">
                        <p><i className="fab fa-reddit"></i>{this.props.subreddit}</p>
                    </div>
                    <h2>{this.props.title}</h2>
                    <h3>{this.props.author}</h3>
                    <hr />
                    <img className={"mainImg " + imgClass} src={imgUrl} />
                    <img className="commentPh fade" src="https://i.imgur.com/yEWE7kf.gif" />
                    <img className="commentPh fade" src="https://i.imgur.com/yEWE7kf.gif" />
                    <img className="commentPh fade" src="https://i.imgur.com/yEWE7kf.gif" />
                    <img className="commentPh fade" src="https://i.imgur.com/yEWE7kf.gif" />
                    <img className="commentPh fade" src="https://i.imgur.com/yEWE7kf.gif" />
                </div>
            )
        }
        if (this.state.activated) {
            if (this.state.data[1].data.children.length === 0) {
                return (
                    <div className="cont">
                        <h4>No comments on this post</h4>
                        <button className="closeButton" onClick={this.handleClose}><i className="far fa-times-circle"></i></button>
                    </div>
                )
            }
            let index = 0;
            const commentData = this.state.data[1].data.children.map(item => {
                if (index < 6) {
                    ++index
                    return (
                        <div key={Math.random()} className="comment">
                            {item.data.body}
                            <span className="likeSpan">
                                <p className="authorComment">{item.data.author}</p>
                                <i className="fas fa-heart like"></i>{item.data.ups}
                            </span>
                        </div>
                    )
                }
            });
            return (
                <div className="cont">
                    <div className="subreddit">
                        <p><i className="fab fa-reddit"></i>{this.props.subreddit}</p>
                    </div>
                    <h2>{this.props.title}</h2>
                    <h3>{this.props.author}</h3>
                    <hr />
                    <img className={"mainImg " + imgClass} src={imgUrl} />
                    {commentData}
                    <button className="closeButton" onClick={this.handleClose}><i className="far fa-times-circle"></i></button>
                </div>
            )
        }
        //***********************likes**************************** */
        let totalLikes;
        if (this.props.likes > 999 && this.props.likes < 1000000) {
            totalLikes = (this.props.likes / 1000).toFixed(0) + 'K'; // convert to K for number from > 1000 < 1 million 
        } else if (this.props.likes > 1000000) {
            totalLikes = (this.props.likes / 1000000).toFixed(0) + 'M'; // convert to M for number from > 1 million 
        } else if (this.props.likes < 900) {
            totalLikes = this.props.likes; // if value < 1000, nothing to do
        }
        //******************comments******************************************************* */
        let totalComments;
        if (this.props.comments > 999 && this.props.comments < 1000000) {
            totalComments = (this.props.comments / 1000).toFixed(0) + 'K'; // convert to K for number from > 1000 < 1 million 
        } else if (this.props.comments > 1000000) {
            totalComments = (this.props.comments / 1000000).toFixed(0) + 'M'; // convert to M for number from > 1 million 
        } else if (this.props.comments < 900) {
            totalComments = this.props.comments; // if value < 1000, nothing to do
        }
        //***************************************************************************** */

        return (
            <div className="cont">
                <div className="subreddit">
                    <p><i className="fab fa-reddit"></i>{this.props.subreddit}</p>
                </div>
                <h2>{this.props.title}</h2>
                <h3>{this.props.author}</h3>
                <hr />
                <img className={"mainImg " + imgClass} src={imgUrl} />
                <div className="social">
                    <span className="socialLikes">
                        <img className="socialIcon" src="http://www.vectorico.com/download/emoticon/heart-icon.png" />
                        <p>{totalLikes}</p>
                    </span>
                    <span className="commentIcon" onClick={() => { this.handleComments(this.props.url) }}>
                        <img className="socialIcon" src="https://c7.uihere.com/icons/467/1007/799/bubble-chat-3c67b0dbe2d2bf7167a7189c0380b4b4.png" />
                        <p>{totalComments}</p>
                    </span>
                </div>
            </div>
        )
    }
}

export default Item