import React from 'react';

function CarouselItem(props) {
    return (
        <div className={"carousel-item " + props.stato}>
            <img className="d-block w-100" src={props.src} alt={props.titolo} />
            <div className="carousel-caption d-none d-lg-block">
                <h1>{props.title}</h1>
            </div>
        </div>
    );
}

function Carousel() {
    return (
        <div id="carousel" className="carousel slide carousel-fade d-none d-sm-block" data-ride="carousel"
             data-pause="false" data-interval="4000">
            <div className="carousel-inner">
                <CarouselItem src="/images/chicago.jpg" titolo="Palermo" stato="active"/>
                <CarouselItem src="/images/la.jpg" titolo="Roma" />
                <CarouselItem src="/images/ny.jpg" titolo="Venezia" />
            </div>
            <a className="carousel-control-prev" role="button" href="#carousel" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" role="button" href="#carousel" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"/>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
}

export default Carousel;