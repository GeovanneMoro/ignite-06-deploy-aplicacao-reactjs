import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "../styles/home.module.scss";

interface IHomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: IHomeProps) {
  console.log("Product", product);
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   // const price = await stripe.prices.retrieve("price_1IYDUVHiUJU1LCBG88xDfNlq", {
//   //   expand: ["product"],
//   // });

//   const price = await stripe.prices.retrieve("price_1IYDUVHiUJU1LCBG88xDfNlq");

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(price.unit_amount / 100),
//   };
//   return {
//     props: {
//       product,
//     },
//   };
// };

export const getStaticProps: GetStaticProps = async () => {
  // const price = await stripe.prices.retrieve("price_1IYDUVHiUJU1LCBG88xDfNlq", {
  //   expand: ["product"],
  // });

  const price = await stripe.prices.retrieve("price_1IYDUVHiUJU1LCBG88xDfNlq");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24hours
  };
};