import React from 'react';

function CarouselItem(props) {
    return (
        <div className={"carousel-item " + props.stato}>
            <a href={"/search?destinazione=" + props.titolo}>
                <img className="d-block w-100 carousel-img" src={props.src} alt={props.titolo} />
                <div className="carousel-caption d-none d-md-block carousel-caption py-3">
                    <span className="h2">{props.titolo}</span>
                </div>
            </a>
        </div>
    );
}

function Carousel() {
    return (
        <div id="carousel" className="carousel slide carousel-fade d-none d-md-block" data-ride="carousel"
             data-pause="false" data-interval="4000">
            <div className="carousel-inner">
                <CarouselItem src="/images/palermo.webp" titolo="Palermo" stato="active"/>
                <CarouselItem src="/images/milano.webp" titolo="Milano" />
                <CarouselItem src="/images/venezia.webp" titolo="Venezia" />
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