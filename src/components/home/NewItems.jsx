import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Skeleton } from "@mui/material";
import NewItemTimer from "../UI/NewItemTimer";

const NewItems = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [Loading, setLoading] = useState();

  async function fetchItems() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems?${id}`
    );
    setItems(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchItems();
  }, []);

  const state = {
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {!Loading ? (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={24}
              responsive={state.responsive}
            >
              {new Array(4).fill(0).map((_, index) => (
                <>
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <div className="lazy">
                        <Skeleton
                          variant="circular"
                          width={50}
                          height={50}
                        ></Skeleton>
                      </div>
                      <i className="fa fa-check">
                        <Skeleton
                          variant="circular"
                          width="100%"
                          height="100%"
                        ></Skeleton>
                      </i>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="lazy nft__item_preview">
                        <Skeleton
                          variant="rounded"
                          width={234}
                          height={220}
                        ></Skeleton>
                      </div>
                    </div>
                    <div className="nft__item_info">
                      <h4 className="item_title">
                        <Skeleton
                          variant="text"
                          width={70}
                          height={20}
                        ></Skeleton>
                      </h4>
                      <div className="nft__item_price">
                        <Skeleton
                          variant="text"
                          width={60}
                          height={20}
                        ></Skeleton>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={24}
              responsive={state.responsive}
            >
              {items.map((item) => (
                <NewItemTimer item={item} key={item.id}></NewItemTimer>
                // <div
                //   className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                //    key={index}
                //>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
