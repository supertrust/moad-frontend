import React from "react";
import Image from "next/image";
import Container from 'react-bootstrap/Container';
import { styles } from './index';
import Button from 'react-bootstrap/Button';
import Link from "next/link";

const Final = () => {
  return (
    <Container className="relative">
      <main className="pt5 black-80 center">
        <div className={styles.pattern}></div>
        <div className={styles.finalpage}>
          <h3 className={styles.mainheading}>신규 가입이<br />
            완료되었습니다.</h3>
          <p className={styles.paratext}>
            입력하신 내용으로 심사가 시작됩니다.
            1~2일(영업일 기준) 승인이 소요되며
            가입완료 시 승인여부를 문자로 보내드립니다.</p>
          <div className={styles.bottomfixedimg}>
            <Image
                    src='/images/cargo/gift.svg'
                    alt="gift"
                    width={270}
                    height={216}
                />
          </div>
          <div className={styles.bottomfixed}>
            <Link
              href={"/login"}
              className="link"
            >
              <Button className={styles.buttonblue}>로그인하러 가기</Button>
            </Link>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Final;
