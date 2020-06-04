import React from 'react';

function Loading() {
     return (
        <div className="cont loadingPost">
            <div className="placeholderSubreddit">
                <img className="subredditImage fade" src="https://i.imgur.com/nc3A21r.gif" />
            </div>
            <img className="headerImage fade" src="https://i.imgur.com/yEWE7kf.gif" />
            <img className="authorImage fade" src="https://i.imgur.com/yEWE7kf.gif" />
            <hr />
            <img className="imageImage fade" src={"https://i.imgur.com/MkcDPP9.gif"} />
            <div className="social">
                <img className="PlaceholderSocialIcon fade" src="https://i.imgur.com/nc3A21r.gif" />
            </div>
        </div>
    )
}

export default Loading