import { formatDateWithLabels } from '@src/utils/formatter';
import React from 'react'
import useAuth from "@src/hooks/useAuth";

function PrivacyPolicy() {
  const { lang } = useAuth();
  const isEnglish = lang == 'en'
  return (
    <>
    <meta content="text/html; charset=UTF-8" httpEquiv="content-type" />
    <style
      type="text/css"
      dangerouslySetInnerHTML={{
        __html:
          'ol.lst-kix_hs939w5g16qb-4.start{counter-reset:lst-ctn-kix_hs939w5g16qb-4 0}ol.lst-kix_awxmkbtjh40q-6.start{counter-reset:lst-ctn-kix_awxmkbtjh40q-6 0}ol.lst-kix_t2hd0tmoilq2-1.start{counter-reset:lst-ctn-kix_t2hd0tmoilq2-1 0}ol.lst-kix_42zj56m5jwjj-8.start{counter-reset:lst-ctn-kix_42zj56m5jwjj-8 0}.lst-kix_lu7dkr5y11op-8>li{counter-increment:lst-ctn-kix_lu7dkr5y11op-8}ol.lst-kix_d2w9oda663hc-4.start{counter-reset:lst-ctn-kix_d2w9oda663hc-4 0}.lst-kix_lu7dkr5y11op-2>li:before{content:"" counter(lst-ctn-kix_lu7dkr5y11op-2,lower-roman) ". "}.lst-kix_42zj56m5jwjj-3>li{counter-increment:lst-ctn-kix_42zj56m5jwjj-3}ol.lst-kix_y3umzqa8up2p-3.start{counter-reset:lst-ctn-kix_y3umzqa8up2p-3 0}.lst-kix_lu7dkr5y11op-1>li:before{content:"" counter(lst-ctn-kix_lu7dkr5y11op-1,decimal) ". "}.lst-kix_lu7dkr5y11op-3>li:before{content:"" counter(lst-ctn-kix_lu7dkr5y11op-3,decimal) ". "}ol.lst-kix_5hsydb3bp6zg-6.start{counter-reset:lst-ctn-kix_5hsydb3bp6zg-6 0}.lst-kix_6nv3eb5uddcw-1>li{counter-increment:lst-ctn-kix_6nv3eb5uddcw-1}.lst-kix_lu7dkr5y11op-5>li:before{content:"" counter(lst-ctn-kix_lu7dkr5y11op-5,lower-roman) ". "}.lst-kix_lu7dkr5y11op-4>li:before{content:"" counter(lst-ctn-kix_lu7dkr5y11op-4,lower-latin) ". "}.lst-kix_t2hd0tmoilq2-7>li{counter-increment:lst-ctn-kix_t2hd0tmoilq2-7}ol.lst-kix_sox39945nbss-4.start{counter-reset:lst-ctn-kix_sox39945nbss-4 0}.lst-kix_5hsydb3bp6zg-7>li{counter-increment:lst-ctn-kix_5hsydb3bp6zg-7}.lst-kix_d2w9oda663hc-0>li{counter-increment:lst-ctn-kix_d2w9oda663hc-0}.lst-kix_lu7dkr5y11op-0>li:before{content:"" counter(lst-ctn-kix_lu7dkr5y11op-0,decimal) ". "}.lst-kix_y3umzqa8up2p-6>li{counter-increment:lst-ctn-kix_y3umzqa8up2p-6}ol.lst-kix_mxvknv8rirov-7.start{counter-reset:lst-ctn-kix_mxvknv8rirov-7 0}.lst-kix_awxmkbtjh40q-8>li{counter-increment:lst-ctn-kix_awxmkbtjh40q-8}.lst-kix_otjcddvhxh24-6>li{counter-increment:lst-ctn-kix_otjcddvhxh24-6}.lst-kix_d2w9oda663hc-7>li:before{content:"" counter(lst-ctn-kix_d2w9oda663hc-7,lower-latin) ". "}ol.lst-kix_otjcddvhxh24-1.start{counter-reset:lst-ctn-kix_otjcddvhxh24-1 0}.lst-kix_d2w9oda663hc-8>li:before{content:"" counter(lst-ctn-kix_d2w9oda663hc-8,lower-roman) ". "}.lst-kix_mxvknv8rirov-8>li{counter-increment:lst-ctn-kix_mxvknv8rirov-8}.lst-kix_lu7dkr5y11op-1>li{counter-increment:lst-ctn-kix_lu7dkr5y11op-1}ol.lst-kix_cdzwpb6gefjs-3.start{counter-reset:lst-ctn-kix_cdzwpb6gefjs-3 0}.lst-kix_cdzwpb6gefjs-3>li{counter-increment:lst-ctn-kix_cdzwpb6gefjs-3}.lst-kix_hs939w5g16qb-5>li{counter-increment:lst-ctn-kix_hs939w5g16qb-5}.lst-kix_mxvknv8rirov-1>li{counter-increment:lst-ctn-kix_mxvknv8rirov-1}.lst-kix_awxmkbtjh40q-4>li{counter-increment:lst-ctn-kix_awxmkbtjh40q-4}ol.lst-kix_5hsydb3bp6zg-1.start{counter-reset:lst-ctn-kix_5hsydb3bp6zg-1 1}ol.lst-kix_cdzwpb6gefjs-8.start{counter-reset:lst-ctn-kix_cdzwpb6gefjs-8 0}.lst-kix_5hsydb3bp6zg-3>li{counter-increment:lst-ctn-kix_5hsydb3bp6zg-3}ol.lst-kix_42zj56m5jwjj-1.start{counter-reset:lst-ctn-kix_42zj56m5jwjj-1 1}.lst-kix_d2w9oda663hc-0>li:before{content:"" counter(lst-ctn-kix_d2w9oda663hc-0,decimal) ". "}.lst-kix_d2w9oda663hc-1>li:before{content:"" counter(lst-ctn-kix_d2w9oda663hc-1,lower-latin) ". "}.lst-kix_d2w9oda663hc-3>li:before{content:"" counter(lst-ctn-kix_d2w9oda663hc-3,decimal) ". "}.lst-kix_d2w9oda663hc-2>li:before{content:"" counter(lst-ctn-kix_d2w9oda663hc-2,lower-roman) ". "}.lst-kix_d2w9oda663hc-6>li:before{content:"" counter(lst-ctn-kix_d2w9oda663hc-6,decimal) ". "}.lst-kix_5hsydb3bp6zg-0>li{counter-increment:lst-ctn-kix_5hsydb3bp6zg-0}.lst-kix_d2w9oda663hc-5>li:before{content:"" counter(lst-ctn-kix_d2w9oda663hc-5,lower-roman) ". "}ol.lst-kix_otjcddvhxh24-8.start{counter-reset:lst-ctn-kix_otjcddvhxh24-8 0}.lst-kix_sox39945nbss-8>li{counter-increment:lst-ctn-kix_sox39945nbss-8}.lst-kix_d2w9oda663hc-4>li:before{content:"" counter(lst-ctn-kix_d2w9oda663hc-4,lower-latin) ". "}.lst-kix_sox39945nbss-4>li{counter-increment:lst-ctn-kix_sox39945nbss-4}.lst-kix_6ighg0wfyl1p-2>li{counter-increment:lst-ctn-kix_6ighg0wfyl1p-2}.lst-kix_cdzwpb6gefjs-7>li{counter-increment:lst-ctn-kix_cdzwpb6gefjs-7}.lst-kix_d2w9oda663hc-8>li{counter-increment:lst-ctn-kix_d2w9oda663hc-8}ol.lst-kix_t2hd0tmoilq2-8.start{counter-reset:lst-ctn-kix_t2hd0tmoilq2-8 0}.lst-kix_42zj56m5jwjj-7>li{counter-increment:lst-ctn-kix_42zj56m5jwjj-7}.lst-kix_mxvknv8rirov-4>li{counter-increment:lst-ctn-kix_mxvknv8rirov-4}.lst-kix_42zj56m5jwjj-6>li{counter-increment:lst-ctn-kix_42zj56m5jwjj-6}.lst-kix_6ighg0wfyl1p-3>li{counter-increment:lst-ctn-kix_6ighg0wfyl1p-3}ol.lst-kix_42zj56m5jwjj-6.start{counter-reset:lst-ctn-kix_42zj56m5jwjj-6 0}.lst-kix_hs939w5g16qb-4>li:before{content:"" counter(lst-ctn-kix_hs939w5g16qb-4,lower-latin) ". "}ol.lst-kix_6nv3eb5uddcw-3.start{counter-reset:lst-ctn-kix_6nv3eb5uddcw-3 0}.lst-kix_hs939w5g16qb-2>li:before{content:"" counter(lst-ctn-kix_hs939w5g16qb-2,lower-roman) ". "}ol.lst-kix_t2hd0tmoilq2-3.start{counter-reset:lst-ctn-kix_t2hd0tmoilq2-3 0}.lst-kix_awxmkbtjh40q-7>li:before{content:"" counter(lst-ctn-kix_awxmkbtjh40q-7,lower-latin) ". "}.lst-kix_hs939w5g16qb-0>li:before{content:"" counter(lst-ctn-kix_hs939w5g16qb-0,decimal) ". "}ol.lst-kix_lu7dkr5y11op-3.start{counter-reset:lst-ctn-kix_lu7dkr5y11op-3 0}.lst-kix_awxmkbtjh40q-3>li:before{content:"" counter(lst-ctn-kix_awxmkbtjh40q-3,decimal) ". "}ol.lst-kix_cdzwpb6gefjs-0.start{counter-reset:lst-ctn-kix_cdzwpb6gefjs-0 0}ol.lst-kix_t2hd0tmoilq2-6.start{counter-reset:lst-ctn-kix_t2hd0tmoilq2-6 0}.lst-kix_awxmkbtjh40q-1>li:before{content:"" counter(lst-ctn-kix_awxmkbtjh40q-1,decimal) ". "}.lst-kix_awxmkbtjh40q-5>li:before{content:"" counter(lst-ctn-kix_awxmkbtjh40q-5,lower-roman) ". "}.lst-kix_6nv3eb5uddcw-5>li{counter-increment:lst-ctn-kix_6nv3eb5uddcw-5}ol.lst-kix_mxvknv8rirov-0.start{counter-reset:lst-ctn-kix_mxvknv8rirov-0 0}ol.lst-kix_awxmkbtjh40q-1.start{counter-reset:lst-ctn-kix_awxmkbtjh40q-1 0}ol.lst-kix_d2w9oda663hc-2.start{counter-reset:lst-ctn-kix_d2w9oda663hc-2 0}ol.lst-kix_sox39945nbss-2{list-style-type:none}.lst-kix_cdzwpb6gefjs-5>li:before{content:"" counter(lst-ctn-kix_cdzwpb6gefjs-5,lower-roman) ". "}ol.lst-kix_sox39945nbss-1{list-style-type:none}ol.lst-kix_sox39945nbss-0{list-style-type:none}ol.lst-kix_sox39945nbss-6{list-style-type:none}.lst-kix_cdzwpb6gefjs-7>li:before{content:"" counter(lst-ctn-kix_cdzwpb6gefjs-7,lower-latin) ". "}.lst-kix_hs939w5g16qb-6>li:before{content:"" counter(lst-ctn-kix_hs939w5g16qb-6,decimal) ". "}ol.lst-kix_sox39945nbss-5{list-style-type:none}.lst-kix_lu7dkr5y11op-7>li:before{content:"" counter(lst-ctn-kix_lu7dkr5y11op-7,lower-latin) ". "}ol.lst-kix_sox39945nbss-4{list-style-type:none}.lst-kix_otjcddvhxh24-7>li{counter-increment:lst-ctn-kix_otjcddvhxh24-7}ol.lst-kix_sox39945nbss-3{list-style-type:none}ol.lst-kix_y3umzqa8up2p-1.start{counter-reset:lst-ctn-kix_y3umzqa8up2p-1 0}ol.lst-kix_42zj56m5jwjj-3.start{counter-reset:lst-ctn-kix_42zj56m5jwjj-3 0}.lst-kix_hs939w5g16qb-8>li:before{content:"" counter(lst-ctn-kix_hs939w5g16qb-8,lower-roman) ". "}ol.lst-kix_sox39945nbss-8{list-style-type:none}ol.lst-kix_sox39945nbss-7{list-style-type:none}ol.lst-kix_cdzwpb6gefjs-3{list-style-type:none}ol.lst-kix_sox39945nbss-6.start{counter-reset:lst-ctn-kix_sox39945nbss-6 0}ol.lst-kix_cdzwpb6gefjs-2{list-style-type:none}ol.lst-kix_cdzwpb6gefjs-1{list-style-type:none}ol.lst-kix_cdzwpb6gefjs-0{list-style-type:none}.lst-kix_d2w9oda663hc-7>li{counter-increment:lst-ctn-kix_d2w9oda663hc-7}ol.lst-kix_5hsydb3bp6zg-4.start{counter-reset:lst-ctn-kix_5hsydb3bp6zg-4 0}ol.lst-kix_cdzwpb6gefjs-8{list-style-type:none}ol.lst-kix_cdzwpb6gefjs-7{list-style-type:none}ol.lst-kix_cdzwpb6gefjs-6{list-style-type:none}ol.lst-kix_lu7dkr5y11op-5.start{counter-reset:lst-ctn-kix_lu7dkr5y11op-5 0}.lst-kix_y3umzqa8up2p-2>li{counter-increment:lst-ctn-kix_y3umzqa8up2p-2}.lst-kix_6nv3eb5uddcw-7>li:before{content:"" counter(lst-ctn-kix_6nv3eb5uddcw-7,lower-latin) ". "}ol.lst-kix_cdzwpb6gefjs-5{list-style-type:none}ol.lst-kix_cdzwpb6gefjs-4{list-style-type:none}.lst-kix_d2w9oda663hc-1>li{counter-increment:lst-ctn-kix_d2w9oda663hc-1}.lst-kix_cdzwpb6gefjs-3>li:before{content:"" counter(lst-ctn-kix_cdzwpb6gefjs-3,decimal) ". "}.lst-kix_cdzwpb6gefjs-1>li:before{content:"" counter(lst-ctn-kix_cdzwpb6gefjs-1,lower-latin) ". "}.lst-kix_6nv3eb5uddcw-1>li:before{content:"" counter(lst-ctn-kix_6nv3eb5uddcw-1,decimal) ". "}.lst-kix_6nv3eb5uddcw-5>li:before{content:"" counter(lst-ctn-kix_6nv3eb5uddcw-5,lower-roman) ". "}.lst-kix_6nv3eb5uddcw-3>li:before{content:"" counter(lst-ctn-kix_6nv3eb5uddcw-3,decimal) ". "}ol.lst-kix_6nv3eb5uddcw-1.start{counter-reset:lst-ctn-kix_6nv3eb5uddcw-1 0}.lst-kix_t2hd0tmoilq2-3>li{counter-increment:lst-ctn-kix_t2hd0tmoilq2-3}.lst-kix_awxmkbtjh40q-5>li{counter-increment:lst-ctn-kix_awxmkbtjh40q-5}.lst-kix_5hsydb3bp6zg-8>li{counter-increment:lst-ctn-kix_5hsydb3bp6zg-8}.lst-kix_42zj56m5jwjj-2>li{counter-increment:lst-ctn-kix_42zj56m5jwjj-2}ol.lst-kix_lu7dkr5y11op-7.start{counter-reset:lst-ctn-kix_lu7dkr5y11op-7 0}.lst-kix_hs939w5g16qb-8>li{counter-increment:lst-ctn-kix_hs939w5g16qb-8}ol.lst-kix_hs939w5g16qb-7.start{counter-reset:lst-ctn-kix_hs939w5g16qb-7 0}.lst-kix_cdzwpb6gefjs-0>li{counter-increment:lst-ctn-kix_cdzwpb6gefjs-0}.lst-kix_5hsydb3bp6zg-0>li:before{content:"" counter(lst-ctn-kix_5hsydb3bp6zg-0,decimal) ". "}.lst-kix_5hsydb3bp6zg-1>li:before{content:"" counter(lst-ctn-kix_5hsydb3bp6zg-1,decimal) ". "}ol.lst-kix_d2w9oda663hc-1.start{counter-reset:lst-ctn-kix_d2w9oda663hc-1 0}ol.lst-kix_6ighg0wfyl1p-0.start{counter-reset:lst-ctn-kix_6ighg0wfyl1p-0 0}ol.lst-kix_6ighg0wfyl1p-6.start{counter-reset:lst-ctn-kix_6ighg0wfyl1p-6 0}ol.lst-kix_5hsydb3bp6zg-3.start{counter-reset:lst-ctn-kix_5hsydb3bp6zg-3 0}ol.lst-kix_y3umzqa8up2p-0.start{counter-reset:lst-ctn-kix_y3umzqa8up2p-0 2}.lst-kix_d2w9oda663hc-3>li{counter-increment:lst-ctn-kix_d2w9oda663hc-3}.lst-kix_lu7dkr5y11op-0>li{counter-increment:lst-ctn-kix_lu7dkr5y11op-0}ol.lst-kix_hs939w5g16qb-1.start{counter-reset:lst-ctn-kix_hs939w5g16qb-1 0}ol.lst-kix_awxmkbtjh40q-5{list-style-type:none}ol.lst-kix_awxmkbtjh40q-4{list-style-type:none}.lst-kix_y3umzqa8up2p-1>li{counter-increment:lst-ctn-kix_y3umzqa8up2p-1}ol.lst-kix_awxmkbtjh40q-3{list-style-type:none}ol.lst-kix_awxmkbtjh40q-2{list-style-type:none}.lst-kix_hs939w5g16qb-6>li{counter-increment:lst-ctn-kix_hs939w5g16qb-6}ol.lst-kix_awxmkbtjh40q-8{list-style-type:none}ol.lst-kix_42zj56m5jwjj-0.start{counter-reset:lst-ctn-kix_42zj56m5jwjj-0 0}ol.lst-kix_awxmkbtjh40q-7{list-style-type:none}ol.lst-kix_awxmkbtjh40q-6{list-style-type:none}.lst-kix_6nv3eb5uddcw-0>li{counter-increment:lst-ctn-kix_6nv3eb5uddcw-0}.lst-kix_otjcddvhxh24-3>li:before{content:"" counter(lst-ctn-kix_otjcddvhxh24-3,decimal) ". "}.lst-kix_otjcddvhxh24-4>li:before{content:"" counter(lst-ctn-kix_otjcddvhxh24-4,lower-latin) ". "}.lst-kix_lu7dkr5y11op-7>li{counter-increment:lst-ctn-kix_lu7dkr5y11op-7}ol.lst-kix_6ighg0wfyl1p-7.start{counter-reset:lst-ctn-kix_6ighg0wfyl1p-7 0}ol.lst-kix_sox39945nbss-1.start{counter-reset:lst-ctn-kix_sox39945nbss-1 0}.lst-kix_awxmkbtjh40q-7>li{counter-increment:lst-ctn-kix_awxmkbtjh40q-7}.lst-kix_6nv3eb5uddcw-4>li{counter-increment:lst-ctn-kix_6nv3eb5uddcw-4}.lst-kix_otjcddvhxh24-0>li:before{content:"" counter(lst-ctn-kix_otjcddvhxh24-0,decimal) ". "}.lst-kix_d2w9oda663hc-5>li{counter-increment:lst-ctn-kix_d2w9oda663hc-5}ol.lst-kix_d2w9oda663hc-8{list-style-type:none}ol.lst-kix_d2w9oda663hc-7{list-style-type:none}ol.lst-kix_d2w9oda663hc-6{list-style-type:none}ol.lst-kix_d2w9oda663hc-5{list-style-type:none}.lst-kix_mxvknv8rirov-3>li:before{content:"" counter(lst-ctn-kix_mxvknv8rirov-3,decimal) ". "}.lst-kix_mxvknv8rirov-4>li:before{content:"" counter(lst-ctn-kix_mxvknv8rirov-4,lower-latin) ". "}.lst-kix_mxvknv8rirov-7>li:before{content:"" counter(lst-ctn-kix_mxvknv8rirov-7,lower-latin) ". "}.lst-kix_mxvknv8rirov-8>li:before{content:"" counter(lst-ctn-kix_mxvknv8rirov-8,lower-roman) ". "}.lst-kix_5hsydb3bp6zg-5>li:before{content:"" counter(lst-ctn-kix_5hsydb3bp6zg-5,lower-roman) ". "}ol.lst-kix_6ighg0wfyl1p-1.start{counter-reset:lst-ctn-kix_6ighg0wfyl1p-1 0}.lst-kix_5hsydb3bp6zg-4>li:before{content:"" counter(lst-ctn-kix_5hsydb3bp6zg-4,lower-latin) ". "}.lst-kix_6ighg0wfyl1p-7>li{counter-increment:lst-ctn-kix_6ighg0wfyl1p-7}ol.lst-kix_d2w9oda663hc-0{list-style-type:none}ol.lst-kix_hs939w5g16qb-6.start{counter-reset:lst-ctn-kix_hs939w5g16qb-6 0}ol.lst-kix_lu7dkr5y11op-8.start{counter-reset:lst-ctn-kix_lu7dkr5y11op-8 0}ol.lst-kix_awxmkbtjh40q-1{list-style-type:none}ol.lst-kix_d2w9oda663hc-4{list-style-type:none}.lst-kix_5hsydb3bp6zg-8>li:before{content:"" counter(lst-ctn-kix_5hsydb3bp6zg-8,lower-roman) ". "}ol.lst-kix_awxmkbtjh40q-0{list-style-type:none}ol.lst-kix_d2w9oda663hc-3{list-style-type:none}ol.lst-kix_sox39945nbss-2.start{counter-reset:lst-ctn-kix_sox39945nbss-2 0}ol.lst-kix_d2w9oda663hc-2{list-style-type:none}ol.lst-kix_d2w9oda663hc-1{list-style-type:none}ol.lst-kix_hs939w5g16qb-2{list-style-type:none}ol.lst-kix_hs939w5g16qb-3{list-style-type:none}ol.lst-kix_hs939w5g16qb-0{list-style-type:none}.lst-kix_sox39945nbss-5>li:before{content:"" counter(lst-ctn-kix_sox39945nbss-5,lower-roman) ". "}ol.lst-kix_hs939w5g16qb-1{list-style-type:none}ol.lst-kix_sox39945nbss-0.start{counter-reset:lst-ctn-kix_sox39945nbss-0 0}ol.lst-kix_hs939w5g16qb-8{list-style-type:none}ol.lst-kix_6ighg0wfyl1p-2.start{counter-reset:lst-ctn-kix_6ighg0wfyl1p-2 0}.lst-kix_sox39945nbss-1>li:before{content:"" counter(lst-ctn-kix_sox39945nbss-1,lower-latin) ". "}ol.lst-kix_hs939w5g16qb-6{list-style-type:none}ol.lst-kix_hs939w5g16qb-7{list-style-type:none}ol.lst-kix_hs939w5g16qb-4{list-style-type:none}ol.lst-kix_hs939w5g16qb-5{list-style-type:none}.lst-kix_awxmkbtjh40q-0>li{counter-increment:lst-ctn-kix_awxmkbtjh40q-0}.lst-kix_mxvknv8rirov-0>li:before{content:"" counter(lst-ctn-kix_mxvknv8rirov-0,decimal) ". "}ol.lst-kix_hs939w5g16qb-0.start{counter-reset:lst-ctn-kix_hs939w5g16qb-0 3}.lst-kix_6nv3eb5uddcw-7>li{counter-increment:lst-ctn-kix_6nv3eb5uddcw-7}.lst-kix_otjcddvhxh24-4>li{counter-increment:lst-ctn-kix_otjcddvhxh24-4}ol.lst-kix_hs939w5g16qb-5.start{counter-reset:lst-ctn-kix_hs939w5g16qb-5 0}.lst-kix_6ighg0wfyl1p-0>li{counter-increment:lst-ctn-kix_6ighg0wfyl1p-0}.lst-kix_y3umzqa8up2p-3>li:before{content:"" counter(lst-ctn-kix_y3umzqa8up2p-3,decimal) ". "}.lst-kix_hs939w5g16qb-3>li:before{content:"" counter(lst-ctn-kix_hs939w5g16qb-3,decimal) ". "}.lst-kix_cdzwpb6gefjs-5>li{counter-increment:lst-ctn-kix_cdzwpb6gefjs-5}.lst-kix_awxmkbtjh40q-6>li:before{content:"" counter(lst-ctn-kix_awxmkbtjh40q-6,decimal) ". "}.lst-kix_otjcddvhxh24-7>li:before{content:"" counter(lst-ctn-kix_otjcddvhxh24-7,lower-latin) ". "}.lst-kix_y3umzqa8up2p-7>li:before{content:"" counter(lst-ctn-kix_y3umzqa8up2p-7,lower-latin) ". "}.lst-kix_awxmkbtjh40q-2>li:before{content:"" counter(lst-ctn-kix_awxmkbtjh40q-2,lower-roman) ". "}ol.lst-kix_6ighg0wfyl1p-0{list-style-type:none}.lst-kix_5hsydb3bp6zg-5>li{counter-increment:lst-ctn-kix_5hsydb3bp6zg-5}.lst-kix_sox39945nbss-1>li{counter-increment:lst-ctn-kix_sox39945nbss-1}ol.lst-kix_6ighg0wfyl1p-4{list-style-type:none}ol.lst-kix_6ighg0wfyl1p-3{list-style-type:none}ol.lst-kix_6ighg0wfyl1p-2{list-style-type:none}ol.lst-kix_6ighg0wfyl1p-1{list-style-type:none}.lst-kix_6ighg0wfyl1p-5>li{counter-increment:lst-ctn-kix_6ighg0wfyl1p-5}ol.lst-kix_6ighg0wfyl1p-8{list-style-type:none}ol.lst-kix_6ighg0wfyl1p-7{list-style-type:none}ol.lst-kix_6ighg0wfyl1p-6{list-style-type:none}ol.lst-kix_6ighg0wfyl1p-5{list-style-type:none}.lst-kix_sox39945nbss-6>li{counter-increment:lst-ctn-kix_sox39945nbss-6}.lst-kix_42zj56m5jwjj-3>li:before{content:"" counter(lst-ctn-kix_42zj56m5jwjj-3,decimal) ". "}.lst-kix_42zj56m5jwjj-7>li:before{content:"" counter(lst-ctn-kix_42zj56m5jwjj-7,lower-latin) ". "}ol.lst-kix_hs939w5g16qb-2.start{counter-reset:lst-ctn-kix_hs939w5g16qb-2 0}.lst-kix_cdzwpb6gefjs-6>li:before{content:"" counter(lst-ctn-kix_cdzwpb6gefjs-6,decimal) ". "}.lst-kix_hs939w5g16qb-7>li:before{content:"" counter(lst-ctn-kix_hs939w5g16qb-7,lower-latin) ". "}ol.lst-kix_6ighg0wfyl1p-4.start{counter-reset:lst-ctn-kix_6ighg0wfyl1p-4 0}.lst-kix_lu7dkr5y11op-8>li:before{content:"" counter(lst-ctn-kix_lu7dkr5y11op-8,lower-roman) ". "}.lst-kix_mxvknv8rirov-6>li{counter-increment:lst-ctn-kix_mxvknv8rirov-6}.lst-kix_lu7dkr5y11op-5>li{counter-increment:lst-ctn-kix_lu7dkr5y11op-5}ol.lst-kix_hs939w5g16qb-3.start{counter-reset:lst-ctn-kix_hs939w5g16qb-3 0}ol.lst-kix_6ighg0wfyl1p-5.start{counter-reset:lst-ctn-kix_6ighg0wfyl1p-5 0}.lst-kix_6nv3eb5uddcw-6>li:before{content:"" counter(lst-ctn-kix_6nv3eb5uddcw-6,decimal) ". "}.lst-kix_hs939w5g16qb-1>li{counter-increment:lst-ctn-kix_hs939w5g16qb-1}.lst-kix_cdzwpb6gefjs-2>li:before{content:"" counter(lst-ctn-kix_cdzwpb6gefjs-2,lower-roman) ". "}.lst-kix_6nv3eb5uddcw-2>li{counter-increment:lst-ctn-kix_6nv3eb5uddcw-2}.lst-kix_42zj56m5jwjj-4>li{counter-increment:lst-ctn-kix_42zj56m5jwjj-4}.lst-kix_t2hd0tmoilq2-0>li{counter-increment:lst-ctn-kix_t2hd0tmoilq2-0}.lst-kix_6nv3eb5uddcw-2>li:before{content:"" counter(lst-ctn-kix_6nv3eb5uddcw-2,lower-roman) ". "}ol.lst-kix_lu7dkr5y11op-4.start{counter-reset:lst-ctn-kix_lu7dkr5y11op-4 0}ol.lst-kix_t2hd0tmoilq2-7{list-style-type:none}.lst-kix_y3umzqa8up2p-4>li{counter-increment:lst-ctn-kix_y3umzqa8up2p-4}ol.lst-kix_t2hd0tmoilq2-8{list-style-type:none}ol.lst-kix_t2hd0tmoilq2-3{list-style-type:none}ol.lst-kix_t2hd0tmoilq2-4{list-style-type:none}ol.lst-kix_t2hd0tmoilq2-5{list-style-type:none}ol.lst-kix_t2hd0tmoilq2-6{list-style-type:none}ol.lst-kix_6nv3eb5uddcw-7.start{counter-reset:lst-ctn-kix_6nv3eb5uddcw-7 0}.lst-kix_cdzwpb6gefjs-1>li{counter-increment:lst-ctn-kix_cdzwpb6gefjs-1}.lst-kix_6ighg0wfyl1p-8>li{counter-increment:lst-ctn-kix_6ighg0wfyl1p-8}.lst-kix_6nv3eb5uddcw-3>li{counter-increment:lst-ctn-kix_6nv3eb5uddcw-3}.lst-kix_otjcddvhxh24-8>li{counter-increment:lst-ctn-kix_otjcddvhxh24-8}.lst-kix_6ighg0wfyl1p-8>li:before{content:"" counter(lst-ctn-kix_6ighg0wfyl1p-8,lower-roman) ". "}.lst-kix_6ighg0wfyl1p-7>li:before{content:"" counter(lst-ctn-kix_6ighg0wfyl1p-7,lower-latin) ". "}ol.lst-kix_mxvknv8rirov-6.start{counter-reset:lst-ctn-kix_mxvknv8rirov-6 0}.lst-kix_d2w9oda663hc-2>li{counter-increment:lst-ctn-kix_d2w9oda663hc-2}.lst-kix_6ighg0wfyl1p-1>li:before{content:"" counter(lst-ctn-kix_6ighg0wfyl1p-1,decimal) ". "}ol.lst-kix_t2hd0tmoilq2-7.start{counter-reset:lst-ctn-kix_t2hd0tmoilq2-7 0}.lst-kix_6ighg0wfyl1p-0>li:before{content:"" counter(lst-ctn-kix_6ighg0wfyl1p-0,decimal) ". "}.lst-kix_6ighg0wfyl1p-2>li:before{content:"" counter(lst-ctn-kix_6ighg0wfyl1p-2,lower-roman) ". "}ol.lst-kix_6ighg0wfyl1p-3.start{counter-reset:lst-ctn-kix_6ighg0wfyl1p-3 0}.lst-kix_6ighg0wfyl1p-3>li:before{content:"" counter(lst-ctn-kix_6ighg0wfyl1p-3,decimal) ". "}.lst-kix_t2hd0tmoilq2-5>li{counter-increment:lst-ctn-kix_t2hd0tmoilq2-5}.lst-kix_6ighg0wfyl1p-5>li:before{content:"" counter(lst-ctn-kix_6ighg0wfyl1p-5,lower-roman) ". "}.lst-kix_6ighg0wfyl1p-4>li:before{content:"" counter(lst-ctn-kix_6ighg0wfyl1p-4,lower-latin) ". "}.lst-kix_6ighg0wfyl1p-6>li:before{content:"" counter(lst-ctn-kix_6ighg0wfyl1p-6,decimal) ". "}ol.lst-kix_awxmkbtjh40q-0.start{counter-reset:lst-ctn-kix_awxmkbtjh40q-0 0}ol.lst-kix_cdzwpb6gefjs-4.start{counter-reset:lst-ctn-kix_cdzwpb6gefjs-4 0}ol.lst-kix_42zj56m5jwjj-2.start{counter-reset:lst-ctn-kix_42zj56m5jwjj-2 0}.lst-kix_hs939w5g16qb-0>li{counter-increment:lst-ctn-kix_hs939w5g16qb-0}.lst-kix_t2hd0tmoilq2-2>li:before{content:"" counter(lst-ctn-kix_t2hd0tmoilq2-2,lower-roman) ". "}ol.lst-kix_d2w9oda663hc-5.start{counter-reset:lst-ctn-kix_d2w9oda663hc-5 0}ol.lst-kix_6nv3eb5uddcw-0{list-style-type:none}.lst-kix_t2hd0tmoilq2-0>li:before{content:"" counter(lst-ctn-kix_t2hd0tmoilq2-0,decimal) ". "}.lst-kix_t2hd0tmoilq2-4>li:before{content:"" counter(lst-ctn-kix_t2hd0tmoilq2-4,lower-latin) ". "}ol.lst-kix_y3umzqa8up2p-4.start{counter-reset:lst-ctn-kix_y3umzqa8up2p-4 0}.lst-kix_t2hd0tmoilq2-1>li:before{content:"" counter(lst-ctn-kix_t2hd0tmoilq2-1,lower-latin) ". "}.lst-kix_t2hd0tmoilq2-5>li:before{content:"" counter(lst-ctn-kix_t2hd0tmoilq2-5,lower-roman) ". "}.lst-kix_42zj56m5jwjj-5>li{counter-increment:lst-ctn-kix_42zj56m5jwjj-5}.lst-kix_t2hd0tmoilq2-3>li:before{content:"" counter(lst-ctn-kix_t2hd0tmoilq2-3,decimal) ". "}ol.lst-kix_5hsydb3bp6zg-0.start{counter-reset:lst-ctn-kix_5hsydb3bp6zg-0 2}ol.lst-kix_otjcddvhxh24-7.start{counter-reset:lst-ctn-kix_otjcddvhxh24-7 0}ol.lst-kix_5hsydb3bp6zg-7.start{counter-reset:lst-ctn-kix_5hsydb3bp6zg-7 0}ol.lst-kix_mxvknv8rirov-1.start{counter-reset:lst-ctn-kix_mxvknv8rirov-1 0}ol.lst-kix_t2hd0tmoilq2-2.start{counter-reset:lst-ctn-kix_t2hd0tmoilq2-2 0}ol.lst-kix_awxmkbtjh40q-5.start{counter-reset:lst-ctn-kix_awxmkbtjh40q-5 0}.lst-kix_6ighg0wfyl1p-4>li{counter-increment:lst-ctn-kix_6ighg0wfyl1p-4}.lst-kix_t2hd0tmoilq2-8>li:before{content:"" counter(lst-ctn-kix_t2hd0tmoilq2-8,lower-roman) ". "}.lst-kix_t2hd0tmoilq2-6>li:before{content:"" counter(lst-ctn-kix_t2hd0tmoilq2-6,decimal) ". "}ol.lst-kix_t2hd0tmoilq2-0{list-style-type:none}ol.lst-kix_d2w9oda663hc-0.start{counter-reset:lst-ctn-kix_d2w9oda663hc-0 0}ol.lst-kix_42zj56m5jwjj-7.start{counter-reset:lst-ctn-kix_42zj56m5jwjj-7 0}ol.lst-kix_t2hd0tmoilq2-1{list-style-type:none}ol.lst-kix_t2hd0tmoilq2-2{list-style-type:none}.lst-kix_6ighg0wfyl1p-1>li{counter-increment:lst-ctn-kix_6ighg0wfyl1p-1}.lst-kix_t2hd0tmoilq2-7>li:before{content:"" counter(lst-ctn-kix_t2hd0tmoilq2-7,lower-latin) ". "}ol.lst-kix_6ighg0wfyl1p-8.start{counter-reset:lst-ctn-kix_6ighg0wfyl1p-8 0}.lst-kix_sox39945nbss-4>li:before{content:"" counter(lst-ctn-kix_sox39945nbss-4,lower-latin) ". "}ol.lst-kix_5hsydb3bp6zg-5.start{counter-reset:lst-ctn-kix_5hsydb3bp6zg-5 0}.lst-kix_sox39945nbss-2>li:before{content:"" counter(lst-ctn-kix_sox39945nbss-2,lower-roman) ". "}.lst-kix_sox39945nbss-6>li:before{content:"" counter(lst-ctn-kix_sox39945nbss-6,decimal) ". "}.lst-kix_hs939w5g16qb-3>li{counter-increment:lst-ctn-kix_hs939w5g16qb-3}.lst-kix_sox39945nbss-0>li:before{content:"" counter(lst-ctn-kix_sox39945nbss-0,decimal) ". "}.lst-kix_sox39945nbss-8>li:before{content:"" counter(lst-ctn-kix_sox39945nbss-8,lower-roman) ". "}ol.lst-kix_y3umzqa8up2p-2.start{counter-reset:lst-ctn-kix_y3umzqa8up2p-2 0}ol.lst-kix_awxmkbtjh40q-2.start{counter-reset:lst-ctn-kix_awxmkbtjh40q-2 0}ol.lst-kix_sox39945nbss-3.start{counter-reset:lst-ctn-kix_sox39945nbss-3 0}ol.lst-kix_hs939w5g16qb-8.start{counter-reset:lst-ctn-kix_hs939w5g16qb-8 0}ol.lst-kix_6nv3eb5uddcw-0.start{counter-reset:lst-ctn-kix_6nv3eb5uddcw-0 0}.lst-kix_mxvknv8rirov-1>li:before{content:"" counter(lst-ctn-kix_mxvknv8rirov-1,lower-latin) ". "}.lst-kix_sox39945nbss-3>li{counter-increment:lst-ctn-kix_sox39945nbss-3}ol.lst-kix_otjcddvhxh24-5{list-style-type:none}ol.lst-kix_otjcddvhxh24-6{list-style-type:none}ol.lst-kix_5hsydb3bp6zg-2.start{counter-reset:lst-ctn-kix_5hsydb3bp6zg-2 0}ol.lst-kix_otjcddvhxh24-7{list-style-type:none}ol.lst-kix_otjcddvhxh24-8{list-style-type:none}.lst-kix_5hsydb3bp6zg-2>li{counter-increment:lst-ctn-kix_5hsydb3bp6zg-2}ol.lst-kix_otjcddvhxh24-1{list-style-type:none}ol.lst-kix_otjcddvhxh24-3{list-style-type:none}ol.lst-kix_otjcddvhxh24-4{list-style-type:none}.lst-kix_y3umzqa8up2p-6>li:before{content:"" counter(lst-ctn-kix_y3umzqa8up2p-6,decimal) ". "}.lst-kix_y3umzqa8up2p-8>li:before{content:"" counter(lst-ctn-kix_y3umzqa8up2p-8,lower-roman) ". "}ol.lst-kix_otjcddvhxh24-0{list-style-type:none}.lst-kix_t2hd0tmoilq2-2>li{counter-increment:lst-ctn-kix_t2hd0tmoilq2-2}.lst-kix_y3umzqa8up2p-2>li:before{content:"" counter(lst-ctn-kix_y3umzqa8up2p-2,lower-roman) ". "}.lst-kix_y3umzqa8up2p-4>li:before{content:"" counter(lst-ctn-kix_y3umzqa8up2p-4,lower-latin) ". "}ol.lst-kix_lu7dkr5y11op-7{list-style-type:none}.lst-kix_d2w9oda663hc-6>li{counter-increment:lst-ctn-kix_d2w9oda663hc-6}.lst-kix_6nv3eb5uddcw-6>li{counter-increment:lst-ctn-kix_6nv3eb5uddcw-6}ol.lst-kix_lu7dkr5y11op-8{list-style-type:none}ol.lst-kix_lu7dkr5y11op-5{list-style-type:none}ol.lst-kix_lu7dkr5y11op-6{list-style-type:none}.lst-kix_5hsydb3bp6zg-1>li{counter-increment:lst-ctn-kix_5hsydb3bp6zg-1}ol.lst-kix_lu7dkr5y11op-6.start{counter-reset:lst-ctn-kix_lu7dkr5y11op-6 0}.lst-kix_42zj56m5jwjj-8>li{counter-increment:lst-ctn-kix_42zj56m5jwjj-8}ol.lst-kix_otjcddvhxh24-0.start{counter-reset:lst-ctn-kix_otjcddvhxh24-0 1}ol.lst-kix_6nv3eb5uddcw-6{list-style-type:none}ol.lst-kix_6nv3eb5uddcw-5{list-style-type:none}.lst-kix_otjcddvhxh24-6>li:before{content:"" counter(lst-ctn-kix_otjcddvhxh24-6,decimal) ". "}.lst-kix_lu7dkr5y11op-3>li{counter-increment:lst-ctn-kix_lu7dkr5y11op-3}ol.lst-kix_6nv3eb5uddcw-8{list-style-type:none}ol.lst-kix_6nv3eb5uddcw-7{list-style-type:none}ol.lst-kix_6nv3eb5uddcw-2{list-style-type:none}.lst-kix_awxmkbtjh40q-2>li{counter-increment:lst-ctn-kix_awxmkbtjh40q-2}ol.lst-kix_6nv3eb5uddcw-1{list-style-type:none}.lst-kix_otjcddvhxh24-8>li:before{content:"" counter(lst-ctn-kix_otjcddvhxh24-8,lower-roman) ". "}ol.lst-kix_6nv3eb5uddcw-4{list-style-type:none}.lst-kix_cdzwpb6gefjs-8>li{counter-increment:lst-ctn-kix_cdzwpb6gefjs-8}ol.lst-kix_6nv3eb5uddcw-3{list-style-type:none}ol.lst-kix_6nv3eb5uddcw-2.start{counter-reset:lst-ctn-kix_6nv3eb5uddcw-2 0}ol.lst-kix_sox39945nbss-5.start{counter-reset:lst-ctn-kix_sox39945nbss-5 0}ol.lst-kix_lu7dkr5y11op-0{list-style-type:none}.lst-kix_42zj56m5jwjj-8>li:before{content:"" counter(lst-ctn-kix_42zj56m5jwjj-8,lower-roman) ". "}ol.lst-kix_lu7dkr5y11op-3{list-style-type:none}ol.lst-kix_lu7dkr5y11op-4{list-style-type:none}ol.lst-kix_lu7dkr5y11op-1{list-style-type:none}ol.lst-kix_lu7dkr5y11op-2{list-style-type:none}.lst-kix_42zj56m5jwjj-6>li:before{content:"" counter(lst-ctn-kix_42zj56m5jwjj-6,decimal) ". "}.lst-kix_y3umzqa8up2p-0>li:before{content:"" counter(lst-ctn-kix_y3umzqa8up2p-0,decimal) ". "}.lst-kix_awxmkbtjh40q-3>li{counter-increment:lst-ctn-kix_awxmkbtjh40q-3}.lst-kix_otjcddvhxh24-1>li{counter-increment:lst-ctn-kix_otjcddvhxh24-1}.lst-kix_42zj56m5jwjj-4>li:before{content:"" counter(lst-ctn-kix_42zj56m5jwjj-4,lower-latin) ". "}ol.lst-kix_42zj56m5jwjj-4.start{counter-reset:lst-ctn-kix_42zj56m5jwjj-4 0}.lst-kix_mxvknv8rirov-3>li{counter-increment:lst-ctn-kix_mxvknv8rirov-3}.lst-kix_42zj56m5jwjj-2>li:before{content:"" counter(lst-ctn-kix_42zj56m5jwjj-2,lower-roman) ". "}ol.lst-kix_mxvknv8rirov-7{list-style-type:none}.lst-kix_y3umzqa8up2p-8>li{counter-increment:lst-ctn-kix_y3umzqa8up2p-8}ol.lst-kix_mxvknv8rirov-8{list-style-type:none}ol.lst-kix_mxvknv8rirov-5{list-style-type:none}.lst-kix_hs939w5g16qb-4>li{counter-increment:lst-ctn-kix_hs939w5g16qb-4}ol.lst-kix_mxvknv8rirov-6{list-style-type:none}.lst-kix_42zj56m5jwjj-0>li:before{content:"" counter(lst-ctn-kix_42zj56m5jwjj-0,decimal) ". "}.lst-kix_lu7dkr5y11op-2>li{counter-increment:lst-ctn-kix_lu7dkr5y11op-2}ol.lst-kix_mxvknv8rirov-0{list-style-type:none}ol.lst-kix_y3umzqa8up2p-8{list-style-type:none}ol.lst-kix_y3umzqa8up2p-7{list-style-type:none}ol.lst-kix_y3umzqa8up2p-6{list-style-type:none}ol.lst-kix_mxvknv8rirov-3{list-style-type:none}ol.lst-kix_mxvknv8rirov-4{list-style-type:none}ol.lst-kix_mxvknv8rirov-1{list-style-type:none}ol.lst-kix_mxvknv8rirov-2{list-style-type:none}ol.lst-kix_y3umzqa8up2p-1{list-style-type:none}ol.lst-kix_y3umzqa8up2p-0{list-style-type:none}ol.lst-kix_d2w9oda663hc-3.start{counter-reset:lst-ctn-kix_d2w9oda663hc-3 0}ol.lst-kix_t2hd0tmoilq2-5.start{counter-reset:lst-ctn-kix_t2hd0tmoilq2-5 0}ol.lst-kix_y3umzqa8up2p-5{list-style-type:none}.lst-kix_42zj56m5jwjj-1>li{counter-increment:lst-ctn-kix_42zj56m5jwjj-1}ol.lst-kix_y3umzqa8up2p-4{list-style-type:none}ol.lst-kix_y3umzqa8up2p-3{list-style-type:none}ol.lst-kix_y3umzqa8up2p-2{list-style-type:none}ol.lst-kix_42zj56m5jwjj-5.start{counter-reset:lst-ctn-kix_42zj56m5jwjj-5 0}ol.lst-kix_5hsydb3bp6zg-8{list-style-type:none}ol.lst-kix_5hsydb3bp6zg-7{list-style-type:none}ol.lst-kix_5hsydb3bp6zg-6{list-style-type:none}.lst-kix_t2hd0tmoilq2-6>li{counter-increment:lst-ctn-kix_t2hd0tmoilq2-6}ol.lst-kix_sox39945nbss-7.start{counter-reset:lst-ctn-kix_sox39945nbss-7 0}ol.lst-kix_5hsydb3bp6zg-1{list-style-type:none}ol.lst-kix_6nv3eb5uddcw-4.start{counter-reset:lst-ctn-kix_6nv3eb5uddcw-4 0}ol.lst-kix_5hsydb3bp6zg-0{list-style-type:none}ol.lst-kix_5hsydb3bp6zg-5{list-style-type:none}ol.lst-kix_5hsydb3bp6zg-4{list-style-type:none}ol.lst-kix_5hsydb3bp6zg-3{list-style-type:none}ol.lst-kix_5hsydb3bp6zg-2{list-style-type:none}.lst-kix_5hsydb3bp6zg-2>li:before{content:"" counter(lst-ctn-kix_5hsydb3bp6zg-2,lower-roman) ". "}.lst-kix_5hsydb3bp6zg-3>li:before{content:"" counter(lst-ctn-kix_5hsydb3bp6zg-3,decimal) ". "}ol.lst-kix_t2hd0tmoilq2-4.start{counter-reset:lst-ctn-kix_t2hd0tmoilq2-4 0}ol.lst-kix_y3umzqa8up2p-6.start{counter-reset:lst-ctn-kix_y3umzqa8up2p-6 0}ol.lst-kix_d2w9oda663hc-7.start{counter-reset:lst-ctn-kix_d2w9oda663hc-7 0}ol.lst-kix_cdzwpb6gefjs-1.start{counter-reset:lst-ctn-kix_cdzwpb6gefjs-1 0}.lst-kix_42zj56m5jwjj-0>li{counter-increment:lst-ctn-kix_42zj56m5jwjj-0}ol.lst-kix_mxvknv8rirov-3.start{counter-reset:lst-ctn-kix_mxvknv8rirov-3 0}.lst-kix_y3umzqa8up2p-3>li{counter-increment:lst-ctn-kix_y3umzqa8up2p-3}.lst-kix_cdzwpb6gefjs-2>li{counter-increment:lst-ctn-kix_cdzwpb6gefjs-2}ol.lst-kix_awxmkbtjh40q-3.start{counter-reset:lst-ctn-kix_awxmkbtjh40q-3 0}ol.lst-kix_cdzwpb6gefjs-7.start{counter-reset:lst-ctn-kix_cdzwpb6gefjs-7 0}.lst-kix_otjcddvhxh24-1>li:before{content:"" counter(lst-ctn-kix_otjcddvhxh24-1,decimal) ". "}.lst-kix_otjcddvhxh24-2>li:before{content:"\\0025a0   "}.lst-kix_y3umzqa8up2p-7>li{counter-increment:lst-ctn-kix_y3umzqa8up2p-7}ol.lst-kix_awxmkbtjh40q-4.start{counter-reset:lst-ctn-kix_awxmkbtjh40q-4 0}.lst-kix_otjcddvhxh24-5>li:before{content:"" counter(lst-ctn-kix_otjcddvhxh24-5,lower-roman) ". "}.lst-kix_mxvknv8rirov-2>li{counter-increment:lst-ctn-kix_mxvknv8rirov-2}.lst-kix_otjcddvhxh24-0>li{counter-increment:lst-ctn-kix_otjcddvhxh24-0}.lst-kix_t2hd0tmoilq2-4>li{counter-increment:lst-ctn-kix_t2hd0tmoilq2-4}.lst-kix_mxvknv8rirov-7>li{counter-increment:lst-ctn-kix_mxvknv8rirov-7}ol.lst-kix_lu7dkr5y11op-2.start{counter-reset:lst-ctn-kix_lu7dkr5y11op-2 0}.lst-kix_t2hd0tmoilq2-8>li{counter-increment:lst-ctn-kix_t2hd0tmoilq2-8}ol.lst-kix_6nv3eb5uddcw-5.start{counter-reset:lst-ctn-kix_6nv3eb5uddcw-5 0}.lst-kix_mxvknv8rirov-5>li:before{content:"" counter(lst-ctn-kix_mxvknv8rirov-5,lower-roman) ". "}.lst-kix_mxvknv8rirov-6>li:before{content:"" counter(lst-ctn-kix_mxvknv8rirov-6,decimal) ". "}.lst-kix_cdzwpb6gefjs-6>li{counter-increment:lst-ctn-kix_cdzwpb6gefjs-6}.lst-kix_5hsydb3bp6zg-6>li:before{content:"" counter(lst-ctn-kix_5hsydb3bp6zg-6,decimal) ". "}.lst-kix_awxmkbtjh40q-1>li{counter-increment:lst-ctn-kix_awxmkbtjh40q-1}ol.lst-kix_sox39945nbss-8.start{counter-reset:lst-ctn-kix_sox39945nbss-8 0}ol.lst-kix_d2w9oda663hc-6.start{counter-reset:lst-ctn-kix_d2w9oda663hc-6 0}.lst-kix_5hsydb3bp6zg-6>li{counter-increment:lst-ctn-kix_5hsydb3bp6zg-6}ol.lst-kix_mxvknv8rirov-8.start{counter-reset:lst-ctn-kix_mxvknv8rirov-8 0}ol.lst-kix_lu7dkr5y11op-1.start{counter-reset:lst-ctn-kix_lu7dkr5y11op-1 0}ol.lst-kix_5hsydb3bp6zg-8.start{counter-reset:lst-ctn-kix_5hsydb3bp6zg-8 0}.lst-kix_sox39945nbss-2>li{counter-increment:lst-ctn-kix_sox39945nbss-2}.lst-kix_sox39945nbss-5>li{counter-increment:lst-ctn-kix_sox39945nbss-5}.lst-kix_5hsydb3bp6zg-7>li:before{content:"" counter(lst-ctn-kix_5hsydb3bp6zg-7,lower-latin) ". "}ol.lst-kix_cdzwpb6gefjs-2.start{counter-reset:lst-ctn-kix_cdzwpb6gefjs-2 0}ol.lst-kix_y3umzqa8up2p-5.start{counter-reset:lst-ctn-kix_y3umzqa8up2p-5 0}ol.lst-kix_mxvknv8rirov-2.start{counter-reset:lst-ctn-kix_mxvknv8rirov-2 0}.lst-kix_sox39945nbss-3>li:before{content:"" counter(lst-ctn-kix_sox39945nbss-3,decimal) ". "}.lst-kix_otjcddvhxh24-3>li{counter-increment:lst-ctn-kix_otjcddvhxh24-3}ol.lst-kix_cdzwpb6gefjs-5.start{counter-reset:lst-ctn-kix_cdzwpb6gefjs-5 0}ol.lst-kix_42zj56m5jwjj-7{list-style-type:none}ol.lst-kix_42zj56m5jwjj-8{list-style-type:none}.lst-kix_sox39945nbss-7>li:before{content:"" counter(lst-ctn-kix_sox39945nbss-7,lower-latin) ". "}ol.lst-kix_otjcddvhxh24-6.start{counter-reset:lst-ctn-kix_otjcddvhxh24-6 0}ol.lst-kix_42zj56m5jwjj-3{list-style-type:none}.lst-kix_6nv3eb5uddcw-8>li{counter-increment:lst-ctn-kix_6nv3eb5uddcw-8}ol.lst-kix_42zj56m5jwjj-4{list-style-type:none}ol.lst-kix_42zj56m5jwjj-5{list-style-type:none}.lst-kix_mxvknv8rirov-5>li{counter-increment:lst-ctn-kix_mxvknv8rirov-5}ol.lst-kix_42zj56m5jwjj-6{list-style-type:none}.lst-kix_lu7dkr5y11op-4>li{counter-increment:lst-ctn-kix_lu7dkr5y11op-4}.lst-kix_t2hd0tmoilq2-1>li{counter-increment:lst-ctn-kix_t2hd0tmoilq2-1}.lst-kix_mxvknv8rirov-2>li:before{content:"" counter(lst-ctn-kix_mxvknv8rirov-2,lower-roman) ". "}.lst-kix_hs939w5g16qb-2>li{counter-increment:lst-ctn-kix_hs939w5g16qb-2}.lst-kix_y3umzqa8up2p-5>li:before{content:"" counter(lst-ctn-kix_y3umzqa8up2p-5,lower-roman) ". "}.lst-kix_y3umzqa8up2p-0>li{counter-increment:lst-ctn-kix_y3umzqa8up2p-0}ol.lst-kix_42zj56m5jwjj-0{list-style-type:none}ol.lst-kix_42zj56m5jwjj-1{list-style-type:none}ol.lst-kix_6nv3eb5uddcw-6.start{counter-reset:lst-ctn-kix_6nv3eb5uddcw-6 0}ol.lst-kix_42zj56m5jwjj-2{list-style-type:none}.lst-kix_otjcddvhxh24-5>li{counter-increment:lst-ctn-kix_otjcddvhxh24-5}.lst-kix_awxmkbtjh40q-8>li:before{content:"" counter(lst-ctn-kix_awxmkbtjh40q-8,lower-roman) ". "}.lst-kix_hs939w5g16qb-1>li:before{content:"" counter(lst-ctn-kix_hs939w5g16qb-1,decimal) ". "}ol.lst-kix_lu7dkr5y11op-0.start{counter-reset:lst-ctn-kix_lu7dkr5y11op-0 0}.lst-kix_5hsydb3bp6zg-4>li{counter-increment:lst-ctn-kix_5hsydb3bp6zg-4}ol.lst-kix_otjcddvhxh24-3.start{counter-reset:lst-ctn-kix_otjcddvhxh24-3 0}.lst-kix_lu7dkr5y11op-6>li{counter-increment:lst-ctn-kix_lu7dkr5y11op-6}ol.lst-kix_t2hd0tmoilq2-0.start{counter-reset:lst-ctn-kix_t2hd0tmoilq2-0 0}ol.lst-kix_d2w9oda663hc-8.start{counter-reset:lst-ctn-kix_d2w9oda663hc-8 0}ol.lst-kix_otjcddvhxh24-4.start{counter-reset:lst-ctn-kix_otjcddvhxh24-4 0}.lst-kix_sox39945nbss-7>li{counter-increment:lst-ctn-kix_sox39945nbss-7}.lst-kix_awxmkbtjh40q-0>li:before{content:"" counter(lst-ctn-kix_awxmkbtjh40q-0,decimal) ". "}.lst-kix_awxmkbtjh40q-4>li:before{content:"" counter(lst-ctn-kix_awxmkbtjh40q-4,lower-latin) ". "}.lst-kix_6nv3eb5uddcw-0>li:before{content:"" counter(lst-ctn-kix_6nv3eb5uddcw-0,decimal) ". "}ol.lst-kix_mxvknv8rirov-4.start{counter-reset:lst-ctn-kix_mxvknv8rirov-4 0}ol.lst-kix_y3umzqa8up2p-7.start{counter-reset:lst-ctn-kix_y3umzqa8up2p-7 0}.lst-kix_cdzwpb6gefjs-4>li{counter-increment:lst-ctn-kix_cdzwpb6gefjs-4}.lst-kix_hs939w5g16qb-5>li:before{content:"" counter(lst-ctn-kix_hs939w5g16qb-5,lower-roman) ". "}.lst-kix_y3umzqa8up2p-1>li:before{content:"" counter(lst-ctn-kix_y3umzqa8up2p-1,decimal) ". "}.lst-kix_lu7dkr5y11op-6>li:before{content:"" counter(lst-ctn-kix_lu7dkr5y11op-6,decimal) ". "}.lst-kix_sox39945nbss-0>li{counter-increment:lst-ctn-kix_sox39945nbss-0}.lst-kix_6ighg0wfyl1p-6>li{counter-increment:lst-ctn-kix_6ighg0wfyl1p-6}ol.lst-kix_awxmkbtjh40q-7.start{counter-reset:lst-ctn-kix_awxmkbtjh40q-7 0}.lst-kix_cdzwpb6gefjs-8>li:before{content:"" counter(lst-ctn-kix_cdzwpb6gefjs-8,lower-roman) ". "}.lst-kix_42zj56m5jwjj-5>li:before{content:"" counter(lst-ctn-kix_42zj56m5jwjj-5,lower-roman) ". "}ol.lst-kix_cdzwpb6gefjs-6.start{counter-reset:lst-ctn-kix_cdzwpb6gefjs-6 0}.lst-kix_mxvknv8rirov-0>li{counter-increment:lst-ctn-kix_mxvknv8rirov-0}.lst-kix_d2w9oda663hc-4>li{counter-increment:lst-ctn-kix_d2w9oda663hc-4}.lst-kix_hs939w5g16qb-7>li{counter-increment:lst-ctn-kix_hs939w5g16qb-7}.lst-kix_6nv3eb5uddcw-8>li:before{content:"" counter(lst-ctn-kix_6nv3eb5uddcw-8,lower-roman) ". "}ol.lst-kix_y3umzqa8up2p-8.start{counter-reset:lst-ctn-kix_y3umzqa8up2p-8 0}.lst-kix_y3umzqa8up2p-5>li{counter-increment:lst-ctn-kix_y3umzqa8up2p-5}ol.lst-kix_6nv3eb5uddcw-8.start{counter-reset:lst-ctn-kix_6nv3eb5uddcw-8 0}ol.lst-kix_otjcddvhxh24-5.start{counter-reset:lst-ctn-kix_otjcddvhxh24-5 0}.lst-kix_cdzwpb6gefjs-4>li:before{content:"" counter(lst-ctn-kix_cdzwpb6gefjs-4,lower-latin) ". "}li.li-bullet-0:before{margin-left:-18pt;white-space:nowrap;display:inline-block;min-width:18pt}.lst-kix_42zj56m5jwjj-1>li:before{content:"" counter(lst-ctn-kix_42zj56m5jwjj-1,decimal) ". "}.lst-kix_awxmkbtjh40q-6>li{counter-increment:lst-ctn-kix_awxmkbtjh40q-6}.lst-kix_6nv3eb5uddcw-4>li:before{content:"" counter(lst-ctn-kix_6nv3eb5uddcw-4,lower-latin) ". "}ol.lst-kix_awxmkbtjh40q-8.start{counter-reset:lst-ctn-kix_awxmkbtjh40q-8 0}ol.lst-kix_mxvknv8rirov-5.start{counter-reset:lst-ctn-kix_mxvknv8rirov-5 0}ul.lst-kix_otjcddvhxh24-2{list-style-type:none}.lst-kix_cdzwpb6gefjs-0>li:before{content:"" counter(lst-ctn-kix_cdzwpb6gefjs-0,decimal) ". "}ol{margin:0;padding:0}table td,table th{padding:0}.c17{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:middle;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;background-color:#f2f2f2;border-left-style:solid;border-bottom-width:1pt;width:137.2pt;border-top-color:#000000;border-bottom-style:solid}.c6{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;background-color:#f2f2f2;border-left-style:solid;border-bottom-width:1pt;width:123.8pt;border-top-color:#000000;border-bottom-style:solid}.c4{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:97.3pt;border-top-color:#000000;border-bottom-style:solid}.c21{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:123.8pt;border-top-color:#000000;border-bottom-style:solid}.c1{border-right-style:solid;padding:-14.9pt -14.9pt -14.9pt -14.9pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:middle;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:97.3pt;border-top-color:#000000;border-bottom-style:solid}.c12{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:137.2pt;border-top-color:#000000;border-bottom-style:solid}.c10{margin-left:36pt;padding-top:0pt;padding-left:0pt;padding-bottom:12pt;line-height:1.5;orphans:2;widows:2;text-align:left}.c3{margin-left:72pt;padding-top:0pt;padding-left:0pt;padding-bottom:12pt;line-height:1.5;orphans:2;widows:2;text-align:left}.c31{margin-left:108pt;padding-top:0pt;padding-left:0pt;padding-bottom:12pt;line-height:1.5;orphans:2;widows:2;text-align:left}.c15{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c13{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c16{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:10pt;font-family:"Arial";font-style:normal}.c14{color:#ff0000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c27{padding-top:0pt;padding-bottom:12pt;line-height:1.5;orphans:2;widows:2;text-align:left;height:11pt}.c7{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:9pt;font-family:"Arial";font-style:normal}.c5{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c8{padding-top:12pt;padding-bottom:12pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c0{padding-top:12pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:center}.c19{padding-top:0pt;padding-bottom:12pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c9{padding-top:12pt;padding-bottom:12pt;line-height:1.5;orphans:2;widows:2;text-align:left}.c30{margin-left:auto;border-spacing:0;border-collapse:collapse}.c34{margin-left:auto;border-spacing:0;border-collapse:collapse;margin-right:auto}.c22{background-color:#ffffff;max-width:451.4pt;padding:72pt 72pt 72pt 72pt}.c28{margin-left:36pt;padding-left:0pt}.c33{color:#ff0000;font-weight:700}.c2{padding:0;margin:0}.c18{background-color:#d9d9d9}.c38{margin-left:72pt}.c20{height:90.8pt}.c11{height:58pt}.c29{margin-left:54pt}.c24{height:66.8pt}.c37{font-weight:700}.c35{height:38.2pt}.c26{height:26.5pt}.c23{background-color:#f2f2f2}.c36{height:10.1pt}.c32{height:78.8pt}.c25{height:63.8pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}'
      }}
    />

    {isEnglish ?
    <>
      <p className="c9">
        <span className="c37">
          Corporation Icarus (hereinafter referred to as "the Company") considers the personal information of users who use the Internet site operated by the Company (
        </span>
        <span className="c33">Homepage URL</span>
        <span className="c5">
          hereinafter referred to as "Icarus") to be very important, and has the following privacy policy. This privacy policy is subject to updates in accordance with changes in laws or guidelines related to personal information, and may change depending on policy changes, so users are advised to check it regularly when visiting the Icarus Marketing Platform website. The privacy policy of the Icarus Marketing Platform includes the following:
        </span>
      </p>
      <ol className="c2 lst-kix_t2hd0tmoilq2-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">1. Collection and Use of Personal Information</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">2. Provision of Personal Information to Third Parties</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">3. Entrustment of Personal Information Processing</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">4. Retention and Disposal of User Personal Information: Period of Use and Disposal</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">5. Operation and Refusal of Cookies</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">6. User Rights</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">7. User Obligations</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">8. Responsibility for Linked Sites</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">9. Technical/Managerial Measures for the Protection of Personal Information</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">10. Personal Information Protection Manager</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">11. Obligation to Notify</span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">1. Collection and Use of Personal Information</span>
      </p>
      <ol className="c2 lst-kix_cdzwpb6gefjs-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            a. The purpose of the Company's collection of personal information is to confirm the identity of users and their intention to use the service in order to provide optimized and customized services. The Company collects only the minimum information necessary to perform the essential functions of the service at the time of initial membership registration, and may additionally collect information necessary for the use of services provided by the Company, such as payment for service use, product delivery, and refunds.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            b. The Company will not use personal information for purposes other than the collection and use purposes without the consent of the user or provide it to third parties without the consent of the user.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            c. The Company may collect and use personal information for the following purposes. However, if it is necessary to collect and retain information other than the information consented to in accordance with relevant laws such as the National Tax Basic Act and the Electronic Financial Transactions Act, the Company may notify the user and collect the information.
          </span>
        </li>
      </ol>
      <p className="c27">
        <span className="c5" />
      </p>
      <p className="c27">
        <span className="c5" />
      </p>
      <p className="c27">
        <span className="c5" />
      </p>
      <p className="c27">
        <span className="c5" />
      </p>
      <p className="c19">
        <span className="c5">
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1) Member
        </span>
      </p>
      <a id="t.7e2c0e26fdc4a753a66d9646ad39acdf46eb1509" />
      <a id="t.0" />
      <table className="c34">
        <tbody>
          <tr className="c35">
            <td className="c17" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">Purpose</span>
              </p>
            </td>
            <td className="c6" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">Items</span>
              </p>
            </td>
            <td className="c12 c23" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">Retention Period</span>
              </p>
            </td>
          </tr>
          <tr className="c35">
            <td className="c12" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">Verification of Member Identity</span>
              </p>
            </td>
            <td className="c21" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">ID (Email Address), Password, Name, Phone Number, Affiliated Company</span>
              </p>
            </td>
            <td className="c12" colSpan={1} rowSpan={2}>
              <p className="c0">
                <span className="c16">6 months upon user withdrawal / 1 month upon rejection, unless there is a transaction, in which case the retention period is according to relevant laws</span>
              </p>
            </td>
          </tr>
          <tr className="c36">
            <td className="c12" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">Records of Complaints and Inquiries, Notification of New Product/Service Information, Communication such as Ad Execution Settlement, etc.</span>
              </p>
            </td>
            <td className="c21" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">ID (Email Address), Password, Name, Phone Number, Affiliated Company</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="c8 c38">
        <span className="c5">&nbsp;</span>
      </p>
      <ol className="c2 lst-kix_5hsydb3bp6zg-1 start" start={2}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            2) Others
            <br /> During the process of using the service or business operations, the following information may be automatically generated, collected, stored, combined, and analyzed:
          </span>
        </li>
      </ol>
      <p className="c9 c38">
        <span className="c5">
          - IP Address, Visit Time, Service Usage Records, etc.: Prevention of Unauthorized Use, Prevention of Unauthorized Use, Development of New Services, and Provision of Customized Services, etc.
        </span>
      </p>
      <ol className="c2 lst-kix_hs939w5g16qb-0 start" start={4}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            라. When collecting user's personal information, the Company must obtain the user's consent unless there is a legal basis. Information such as race, place of origin, domicile, beliefs, political inclinations, criminal records, and health status, which may infringe on the user's basic rights, will not be collected without the user's consent or unless required by law.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            마. The Company allows membership registration only for users aged 14 or older, and personal information of children under 14, requiring legal guardian consent for collection and use, is not collected as a rule. However, personal information of users under 14 may be collected and used with legal guardian consent.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            바. The Company may collect personal information through the following methods:
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_hs939w5g16qb-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            1) Website, mobile application, mobile web page, written forms, fax, telephone, customer center inquiries, event participation
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">2) Automatic collection through generated information collection tools</span>
        </li>
      </ol>
      <ol className="c2 lst-kix_hs939w5g16qb-0" start={7}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            사. In collecting personal information, the Company distinguishes the minimum necessary personal information required for service provision as 'Required Consent Items' and provides a separate procedure for individual consent. The Company does not refuse service provision based on the user's refusal to provide personal information beyond the minimum necessary.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">&nbsp;</span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">2. Provision of Personal Information to Third Parties</span>
      </p>
      <ol className="c2 lst-kix_6nv3eb5uddcw-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            가. The Company uses user's personal information within the scope notified in the "Collection and Use of Personal Information" and generally does not provide user's personal information to third parties beyond that scope without the user's prior consent. However, exceptions are as follows:
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_6nv3eb5uddcw-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">1) When users have agreed to disclosure or provision to third parties in advance</span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">2) When required by law or when there is a request from investigative or supervisory authorities for investigation purposes in accordance with the procedures and methods prescribed by law</span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">3) When necessary for billing settlement</span>
        </li>
      </ol>
      <ol className="c2 lst-kix_6nv3eb5uddcw-0" start={2}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            나. Users may refuse consent for the provision of personal information to third parties and may withdraw consent for such provision at any time. Even if consent is refused, users can still use the membership registration service, but the use/provision of related services based on third-party provision may be restricted. Any changes regarding the provision of personal information to third parties will be announced separately.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">3. Processing of Personal Information by Third Parties</span>
      </p>
      <ol className="c2 lst-kix_6ighg0wfyl1p-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            가. In order to provide smooth and enhanced services, the Company may entrust the processing of personal information to third parties. In this case, the Company shall notify users in advance and obtain consent for all of the following items. The same applies if any of the following items change.
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_6ighg0wfyl1p-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">1) Recipient of the entrusted personal information processing</span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">2) Content of the entrusted personal information processing</span>
        </li>
      </ol>
      <ol className="c2 lst-kix_6ighg0wfyl1p-0" start={2}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            나. If necessary for fulfilling contracts related to the provision of information and communication services and for improving user convenience, the Company may entrust personal information processing to third parties without going through notification and consent procedures by disclosing the items specified in item (a) in accordance with the privacy policy.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            다. When the Company entrusts work related to the processing of personal information, it takes necessary measures to ensure that the entrusted personal information is securely managed in accordance with relevant laws. The Company considers the personal information protection capabilities of the delegate when entering into an entrustment contract and periodically verifies whether the delegate fulfills its obligations regarding the secure management and destruction of personal information. Moreover, the information entrusted for processing is limited to the minimum necessary for providing smooth services.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">&nbsp;</span>
      </p>
      <p className="c9">
        <span className="c5">4. Retention of User Personal Information: Period of Use and Disposal</span>
      </p>
      <p className="c9">
        <span className="c5">
          The Company generally retains and uses the personal information of users for the period notified and agreed upon. When the purpose of collecting and using personal information is achieved or when a user requests disposal, the Company promptly disposes of it. However, the following information is retained for the specified period for the reasons stated below.
        </span>
      </p>
      <ol className="c2 lst-kix_d2w9oda663hc-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">가. Reasons for Retaining Information under Relevant Laws and Company Policies</span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">
          If there is a need to retain user's personal information under the provisions of relevant laws, the Company shall retain the user's personal information in accordance with the provisions of the law and shall not use it for marketing or other purposes.
        </span>
      </p>
      <ol className="c2 lst-kix_sox39945nbss-0 start" start={1}>
        <li className="c19 c28 li-bullet-0">
          <span className="c5">1) Reasons for Retaining Information under Relevant Laws</span>
        </li>
      </ol>
      <table className="c30">
        <tbody>
          <tr className="c26">
            <td className="c4 c18" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Relevant Laws</span>
              </p>
            </td>
            <td className="c4 c18" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Purpose</span>
              </p>
            </td>
            <td className="c4 c18" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Items Collected</span>
              </p>
            </td>
            <td className="c4 c18" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Retention Period</span>
              </p>
            </td>
          </tr>
          <tr className="c11">
            <td className="c4" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Act on the Protection of Communications Secrets</span>
              </p>
            </td>
            <td className="c4" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Provided when requested by investigative agencies with a court warrant</span>
              </p>
            </td>
            <td className="c4" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Log records, IP, etc.</span>
              </p>
            </td>
            <td className="c4" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">3 months</span>
              </p>
            </td>
          </tr>
          <tr className="c24">
            <td className="c1" colSpan={1} rowSpan={2}>
              <p className="c0">
                <span className="c7">National Tax Basic Act</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Calculation of the statute of limitations for national taxes</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Tax-related documents, etc.</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">10 years</span>
              </p>
            </td>
          </tr>
          <tr className="c25">
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Calculation of the statute of limitations for tax collection rights</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Taxable standard and tax declaration data, etc.</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">5 years</span>
              </p>
            </td>
          </tr>
          <tr className="c32">
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Value-Added Tax Act</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Ledgers, tax invoices, import tax invoices, receipts, etc.</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Data on taxable standard and tax amount, etc.</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">5 years</span>
              </p>
            </td>
          </tr>
          <tr className="c20">
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Electronic Financial Transactions Act</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Confirmation of electronic financial transaction records</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">Records of electronic financial transactions, degree of counterpart, etc.</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">5 years</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="c9 c29">
        <span className="c5">&nbsp;</span>
      </p>
      <ol className="c2 lst-kix_42zj56m5jwjj-1 start" start={2}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            2) Reasons for Retaining Information under Company Policies: Information collected at the time of registration for member identification purposes will be deleted 6 months after withdrawal and 1 month after rejection.
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_42zj56m5jwjj-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            나. The retention and use period of collected personal information is from the time of service contract conclusion (membership registration) to service contract termination (withdrawal application, forced withdrawal included). In addition, when consent is revoked, the Company shall promptly destroy personal information except for data stored for certain periods based on the reasons for retaining information as mentioned above, and if personal information is entrusted to a third party, the Company shall instruct the trustee to destroy it as well.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            다. Personal information of users who have not used the Company's services for one year will be notified to the users in accordance with Article 29 of the 'Act on Promotion of Information and Communications Network Utilization and Information Protection, etc.,' and will be destroyed or stored separately. However, if there is a need to retain the user's personal information under the provisions of relevant laws, the user's personal information shall be retained for a certain period as specified in the relevant laws.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            라. The Company will notify users of the fact that personal information is being destroyed or stored separately and the expiration date and items of such personal information, by means of notices, electronic mail, etc., 30 days before the expiration of the multiple periods. For this purpose, users must provide/update accurate contact information to the Company.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">마. Method of Destruction</span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">
          Personal information of users will be promptly destroyed after the purpose of collection and use has been achieved. Personal information printed on paper will be destroyed by shredding or incineration, and personal information stored in electronic file format will be destroyed using technical methods or physical methods that make it impossible to reproduce records.
        </span>
      </p>
      <p className="c9">
        <span className="c5">5. Operation and Rejection of Cookies</span>
      </p>
      <ol className="c2 lst-kix_lu7dkr5y11op-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">가. Purpose of Using Cookies</span>
        </li>
      </ol>
      <ol className="c2 lst-kix_lu7dkr5y11op-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            1) The Company uses 'cookies' to provide personalized services on the websites operated by the Company. Cookies are small amounts of information that the website server sends to the user's browser and are stored on the user's computer's hard drive.
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">
            2) The Company can provide specific customized services only through the use of cookies.
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">
            3) The Company may use cookies to identify members and maintain the member's login status.
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_lu7dkr5y11op-0" start={2}>
        <li className="c10 li-bullet-0">
          <span className="c5">나. Installation/Operation and Rejection of Cookies</span>
        </li>
      </ol>
      <ol className="c2 lst-kix_lu7dkr5y11op-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            1) Users have the option to install cookies. Therefore, users can allow/reject all cookies or require confirmation each time cookies are stored by adjusting the options in their web browser.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">
          - The method of specifying whether to allow cookie installation (for Internet Explorer) is as follows:
        </span>
      </p>
      <ul className="c2 lst-kix_otjcddvhxh24-2 start">
        <li className="c31 li-bullet-0">
          <span className="c5">Select [Internet Options] from the [Tools] menu.</span>
        </li>
        <li className="c31 li-bullet-0">
          <span className="c5">Click on the [Privacy] tab.</span>
        </li>
        <li className="c31 li-bullet-0">
          <span className="c5">Set the [Privacy Settings].</span>
        </li>
      </ul>
      <ol className="c2 lst-kix_otjcddvhxh24-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            2) If you refuse to store cookies, some services provided by the company, such as personalized services, may be difficult to use.
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">
            3) For detailed information on personalized advertisements, please check the link.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">6. User Rights</span>
      </p>
      <ol className="c2 lst-kix_awxmkbtjh40q-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            가. Users can access, correct, or delete their personal information at any time through the Personal Information Customer Center, and if requested by electronic mail or in writing, we will process access, correction, and deletion. If a user's personal information is provided to or entrusted to a third party, the user can request destruction from the company or the 'third party'/'trustee.' However, it may not be possible to correct or delete the member ID (ID) or name, and exceptions may be allowed for changes in the name due to personal name changes or business registration number changes due to administrative issues. In cases where correction or deletion is prohibited or restricted by other laws, processing may be limited accordingly. Furthermore, if a request for correction of personal information errors is made, personal information will not be used or provided until the correction is completed unless it is requested for the provision of personal information under another law, and if incorrect personal information has already been provided, the correction results will be notified to third parties to ensure correction.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            나. Users can request the suspension of processing regarding their personal information on the Icarus Marketing Platform site at any time. However, in the following cases, a request for suspension of processing may be denied.
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_awxmkbtjh40q-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            1) In cases where there are special provisions in the law or where it is unavoidable to comply with legal obligations
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">
            2) In cases where there is a risk of harming the life or body of another person or unfairly infringing on the property and other interests of another person
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">
            3) In cases where it is difficult to perform the contract because the provision of the agreed service to the information subject is impossible without processing personal information and the information subject has not clearly expressed an intention to terminate the contract
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_awxmkbtjh40q-0" start={3}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            다. Users can withdraw consent to the collection, use, and provision of personal information agreed upon through membership registration, etc., at any time. Withdrawal of consent can be made by clicking "Membership Withdrawal Application" on the company's website or by contacting us in writing, by email, etc., and we will promptly take necessary measures such as deleting personal information. However, if the company is required by law or the terms and conditions to retain the user's personal information, processing may be limited. In this case, the user must clearly identify themselves with their member ID and personal identification information, and there may be some restrictions on the use of the service or the inability to use some services due to withdrawal.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">7. User Obligations</span>
      </p>
      <p className="c9">
        <span className="c5">
          Users have an obligation to protect their personal information, and the company is not responsible for problems arising from the leakage of personal information due to the user's own negligence, such as transfer, lending, loss of ID, password, access media, etc., or hacking using methods or technologies that cannot be blocked by the user's own care or security measures prescribed by law, even if the company has no culpable reason.
        </span>
      </p>
      <ol className="c2 lst-kix_mxvknv8rirov-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            가. Users must keep their personal information up to date, and users are responsible for problems caused by inaccurate information input by users themselves.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            나. In the event of membership registration using another person's personal information or using someone else's ID to process payment, users may lose their user qualifications and may be punished in accordance with relevant laws.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            다. Users are responsible for maintaining the security of IDs, passwords, etc., and cannot transfer or lend them to third parties. Users are obliged to cooperate with periodic password changes for security in accordance with the company's privacy policy.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            라. After using the company's services, users must always log out of their accounts and close the web browser program.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            마. Users must comply with the "Act on Promotion of Information and Communication Network Utilization and Information Protection," the "Personal Information Protection Act," and other laws related to personal information.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">8. Responsibility for Linked Sites</span>
      </p>
      <p className="c9">
        <span className="c5">
          The company may provide links to other websites to users. However, this "Privacy Policy" does not apply to websites linked by links that collect personal information.
        </span>
      </p>
      <p className="c9">
        <span className="c5">9. Technical/Administrative Measures for Personal Information Protection</span>
      </p>
      <p className="c9">
        <span className="c5">
          The company takes technical/administrative measures to ensure the security of users' personal information and prevent its loss, theft, leakage, alteration, or damage as follows.
        </span>
      </p>
      <p className="c9">
        <span className="c5">가. Encryption of Personal Information</span>
      </p>
      <p className="c9">
        <span className="c5">
          Users' passwords are stored and managed by encrypting them unidirectionally, and confirmation and modification of personal information are only possible by the user who knows the password. Passwords are created and applied based on password creation rules to prevent easy guessing of numbers such as the user's birthday or phone number. Personal information such as passwords is encrypted and stored and managed using secure encryption algorithms.
        </span>
      </p>
      <p className="c9">
        <span className="c5">나. Measures against Hacking</span>
      </p>
      <p className="c9">
        <span className="c5">
          The company operates intrusion detection and prevention systems 24 hours a day to prevent the leakage of users' personal information due to hacking or other intrusions into the company's information and communication network. To prepare for any contingencies, all intrusion detection and prevention systems are operated in duplicate, and sensitive personal information is securely transmitted over the network through encryption communication.
        </span>
      </p>
      <p className="c9">
        <span className="c5">다. Minimization and Education of Personal Information Handlers</span>
      </p>
      <p className="c9">
        <span className="c5">
          The company restricts the number of personal information handlers and raises awareness of the importance of personal information protection through educational and managerial measures for personal information handlers.
        </span>
      </p>
      <p className="c9">
        <span className="c5">라. Operation of Personal Information Protection Department</span>
      </p>
      <p className="c9">
        <span className="c5">
          The company operates a dedicated department for the efficient protection of personal information and makes efforts to promptly correct any issues discovered regarding compliance with the privacy policy and the compliance of personal information handlers.
        </span>
      </p>
      <p className="c9">
        <span className="c5">10. Personal Information Protection Manager</span>
      </p>
      <p className="c9">
        <span className="c5">
          The company strives to ensure that users can safely use the company's services. Users can report all complaints related to the use of the company's services and personal information protection to the dedicated department, and the company will respond promptly and earnestly to the user's reported issues.
        </span>
      </p>
      <p className="c9">
        <span className="c5">[Personal Information Protection Manager]</span>
      </p>
      <p className="c9">
        <span className="c5">Name: Lee Jin-hee</span>
      </p>
      <p className="c9">
        <span className="c5">Department: Personal Information Protection Team</span>
      </p>
      <p className="c9">
        <span className="c5">Email: lubme520@naver.com</span>
      </p>
      <p className="c9">
        <span className="c5">Phone: 044-864-9984</span>
      </p>
      <p className="c9">
        <span className="c5">
          ※ The above contact information is connected to the "Personal Information Protection Center."
        </span>
      </p>
      <p className="c9">
        <span className="c5">
          If you need to report or consult on any other personal information infringement, please contact the following organizations:
        </span>
      </p>
      <p className="c9">
        <span className="c5">
          - Personal Information Dispute Mediation Committee / www.kopico.go.kr / 1833-6972
        </span>
      </p>
      <p className="c9">
        <span className="c5">
          - Personal Information Infringement Report Center / privacy.kisa.or.kr / 118 (no area code required)
        </span>
      </p>
      <p className="c9">
        <span className="c5">
          - Supreme Prosecutors' Office Cyber Crime Investigation Center / www.spo.go.kr / 1301 (no area code required)
        </span>
      </p>
      <p className="c9">
        <span className="c5">
          - Cyber Safety Bureau, National Police Agency / cyberbureau.police.go.kr / 182 (no area code required)
        </span>
      </p>
      <p className="c9">
        <span className="c5">11. Duty of Notification</span>
      </p>
      <p className="c9">
        <span className="c5">
          This privacy policy may undergo additions, deletions, or modifications of its contents due to changes in relevant laws and guidelines or the company's needs. In such cases, we will notify you at least 7 days in advance via the homepage or email, and if prior notification is difficult, we will promptly notify you, and the policy will take effect after 7 days have passed without separate notification. However, in the event of significant changes, we will notify you at least 30 days in advance, and the policy will take effect after 30 days have passed without separate notification. In addition, the company may obtain separate consent from customers as required by relevant laws.
        </span>
      </p>
      <p className="c9">
        <span className="c14">Date of Announcement: {formatDateWithLabels()}</span>
      </p>
      <p className="c9">
        <span className="c14">Effective Date: {formatDateWithLabels()}</span>
      </p>
      <p className="c8">
        <span className="c15">&nbsp;</span>
      </p>
      <p className="c13">
        <span className="c15" />
      </p>

    </>
    :
    <>
      <p className="c9">
        <span className="c37">
          ㈜이카루스(이하 “회사”)는 회사가 운영하는 인터넷 사이트(
        </span>
        <span className="c33">홈페이지 URL</span>
        <span className="c5">
          이하 “이카루스”)를 이용하는 이용자님들의 개인정보를 매우 중요하게 생각하며
          아래와 같은 개인정보처리방침을 가지고 있습니다. 이 개인정보처리방침은
          개인정보와 관련한 법령 또는 지침의 변경이 있는 경우 갱신되고, 정책의
          변화에 따라 달라질 수 있으니 이용자께서는 이카루스 마케팅 플랫폼 사이트를
          방문 시 수시로 확인하여 주시기 바랍니다. 이카루스 마케팅 플랫폼의
          개인정보처리방침은 다음과 같은 내용을 담고 있습니다.
        </span>
      </p>
      <ol className="c2 lst-kix_t2hd0tmoilq2-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">1. 개인정보의 수집•이용</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">2. 개인정보 제3자 제공</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">3. 개인정보 처리 위탁</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">4. 이용자 개인정보의 보유: 이용기간 및 파기</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">5. 쿠키(Cookie)의 운용 및 거부</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">6. 이용자 권리</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">7. 이용자의 의무</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">8. 링크 사이트에 대한 책임</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">9. 개인정보의 기술적/관리적 보호 대책</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">10. 개인정보보호책임자</span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">11. 고지의 의무</span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">1. 개인정보의 수집·이용</span>
      </p>
      <ol className="c2 lst-kix_cdzwpb6gefjs-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            가. 회사가 개인정보를 수집하는 목적은 이용자의 신분과 서비스 이용의사를
            확인하여 최적화되고 맞춤화된 서비스를 제공하기 위함입니다. 회사는 최초
            회원가입 시 서비스의 본질적 기능을 수행하기 위해 반드시 필요한 최소한의
            정보만을 수집하고 있으며 회사가 제공하는 서비스 이용에 따른 대금결제,
            물품배송 및 환불 등에 필요한 정보를 추가로 수집할 수 있습니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            나. 회사는 개인정보를 수집·이용목적 이외에 다른 용도로 이를 이용하거나
            이용자의 동의 없이 제3자에게 이를 제공하지 않습니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            다. 회사는 다음과 같은 목적으로 개인정보를 수집하여 이용할 수 있습니다.
            다만, 국세기본법, 전자금융거래법 등 관계법령에 따라 동의 받은 정보
            이외에도 수집•보관이 불가피한 경우에는 이용자에게 고지하여 해당 정보를
            수집할 수 있습니다.
          </span>
        </li>
      </ol>
      <p className="c27">
        <span className="c5" />
      </p>
      <p className="c27">
        <span className="c5" />
      </p>
      <p className="c27">
        <span className="c5" />
      </p>
      <p className="c27">
        <span className="c5" />
      </p>
      <p className="c19">
        <span className="c5">
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1) 회원
        </span>
      </p>
      <a id="t.7e2c0e26fdc4a753a66d9646ad39acdf46eb1509" />
      <a id="t.0" />
      <table className="c34">
        <tbody>
          <tr className="c35">
            <td className="c17" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">목적</span>
              </p>
            </td>
            <td className="c6" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">항목</span>
              </p>
            </td>
            <td className="c12 c23" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">보유기간</span>
              </p>
            </td>
          </tr>
          <tr className="c35">
            <td className="c12" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">회원 본인 여부 확인</span>
              </p>
            </td>
            <td className="c21" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">
                  아이디(이메일주소), 비밀번호, 이름, 전화번호, 소속회사
                </span>
              </p>
            </td>
            <td className="c12" colSpan={1} rowSpan={2}>
              <p className="c0">
                <span className="c16">
                  사용자 탈퇴 시 6개월 / 반려 시 1개월 단, 거래가 있는 경우에는 관련
                  법령에 따른 보존기간
                </span>
              </p>
            </td>
          </tr>
          <tr className="c36">
            <td className="c12" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">
                  불만처리 및 문의응대기록, 새로운 상품/서비스 정보와 고지, 사항의
                  안내, 광고집행 정산 등 커뮤니케이션
                </span>
              </p>
            </td>
            <td className="c21" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c16">
                  아이디(이메일주소), 비밀번호, 이름, 전화번호, 소속회사
                </span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="c8 c38">
        <span className="c5">&nbsp;</span>
      </p>
      <ol className="c2 lst-kix_5hsydb3bp6zg-1 start" start={2}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            2)기타
            <br /> 서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이
            자동으로 생성되어 수집•저장•조합•분석 될 수 있습니다.
          </span>
        </li>
      </ol>
      <p className="c9 c38">
        <span className="c5">
          - IP Address, 방문 일시, 서비스 이용 기록 등 이용내역정보: 부정 이용 방지,
          비인가 사용 방지, 신규 서비스 개발 및 맞춤서비스 제공 등
        </span>
      </p>
      <ol className="c2 lst-kix_hs939w5g16qb-0 start" start={4}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            라. 회사는 이용자의 개인정보를 수집할 경우 법령상 근거가 없는 한 반드시
            이용자의 동의를 얻어 수집하며, 이용자의 기본적 인권을 침해할 우려가 있는
            인종, 출신지, 본적지, 사상, 정치적 성향, 범죄기록, 건강상태 등의 정보는
            이용자의 동의 또는 법령의 규정에 의한 경우 이외에는 수집하지 않습니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            마. 회사는 회원 가입을 만 14세 이상인 경우에 가능하도록 하며 개인정보의
            수집•이용에 법정대리인의 동의가 필요한 만 14세 미만 아동의 개인정보는
            원칙적으로 수집하지 않습니다. 단, 법정대리인의 동의를 얻은 경우에는 만
            14세 미만 이용자의 개인정보를 수집•이용할 수 있습니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            바. 회사는 다음과 같은 방법으로 개인정보를 수집할 수 있습니다.
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_hs939w5g16qb-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            1) 홈페이지, 모바일 어플리케이션, 모바일 웹 페이지 서면, 팩스, 전화,
            고객센터 문의하기, 이벤트 응모
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">2) 생성정보 수집 툴을 통한 자동 수집</span>
        </li>
      </ol>
      <ol className="c2 lst-kix_hs939w5g16qb-0" start={7}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            사. 회사는 개인정보를 수집함에 있어, 서비스 제공에 필요한 최소한의
            개인정보를 ‘필수동의 항목’으로, 그 외 개인정보는 ‘선택동의 항목’으로
            구분하여 이에 대해 개별적으로 동의할 수 있는 절차를 마련합니다. 회사는
            이용자가 필요한 최소한의 개인정보 이외의 개인정보를 제공하지 아니한다는
            이유로 그 서비스의 제공을 거부하지 않습니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">&nbsp;</span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">2. 개인정보 제3자 제공</span>
      </p>
      <ol className="c2 lst-kix_6nv3eb5uddcw-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            가. 회사는 이용자들의 개인정보를 「개인정보의 수집·이용」에서 고지한
            범위 내에서 사용하며, 이용자의 사전 동의 없이 동 범위를 초과하여
            이용하거나 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
            다만, 아래의 경우에는 예외로 합니다.
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_6nv3eb5uddcw-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            1) 이용자들이 사전에 공개 또는 제3자 제공에 동의한 경우
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">
            2) 법령의 규정에 의거하거나, 수사, 조사 목적으로 법령에 정해진 절차와
            방법에 따라 수사기관 및 감독당국의 요구가 있는 경우
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">3) 요금 정산을 위하여 필요한 경우</span>
        </li>
      </ol>
      <ol className="c2 lst-kix_6nv3eb5uddcw-0" start={2}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            나. 이용자는 개인정보의 제3자 제공에 대하여 동의를 하지 않을 수 있고,
            언제든지 제3자 제공 동의를 철회할 수 있습니다. 동의를 거부하시는
            경우에도 회원가입서비스는 이용하실 수 있으나, 제 3자 제공에 기반한 관련
            서비스의 이용/제공이 제한될 수 있습니다. 기타 개인정보 제3자 제공에 대한
            변동사항은 공지 및 별도 통지를 할 예정입니다.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">3. 개인정보의 처리 위탁</span>
      </p>
      <ol className="c2 lst-kix_6ighg0wfyl1p-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            가. 회사는 원활하고 향상된 서비스를 제공하기 위해 개인정보 처리를
            타인에게 위탁할 수 있습니다. 이 경우 회사는 사전에 다음 각 호의 사항
            모두를 이용자에게 미리 알리고 동의를 받습니다. 다음 각 호의 어느 하나의
            사항이 변경되는 경우에도 같습니다.
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_6ighg0wfyl1p-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">1) 개인정보 처리 위탁을 받는 자</span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">2) 개인정보 처리 위탁을 하는 업무의 내용</span>
        </li>
      </ol>
      <ol className="c2 lst-kix_6ighg0wfyl1p-0" start={2}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            나. 회사는 정보통신서비스의 제공에 관한 계약을 이행하고 이용자 편의 증진
            등을 위하여 필요한 경우 개인정보처리방침에 따라 가항 각 호의 사항을
            공개함으로써 고지절차와 동의절차를 거치지 아니하고 개인정보 처리를
            타인에게 위탁할 수 있습니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            다. 회사는 개인정보의 처리와 관련하여 업무를 위탁하는 경우에는
            관계법령에 따라 위탁 계약 시 개인정보가 안전하게 관리될 수 있도록 필요한
            조치를 합니다. 회사는 위탁 계약 시 수탁자의 개인정보 보호조치 능력을
            고려하고, 개인정보의 안전한 관리 및 파기 등 수탁자의 의무 이행 여부를
            주기적으로 확인합니다. 또한 위탁처리하는 정보는 원활한 서비스를 제공하기
            위하여 필요한 최소한의 정보에 국한됩니다.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">&nbsp;</span>
      </p>
      <p className="c9">
        <span className="c5">4. 이용자 개인정보의 보유: 이용기간 및 파기</span>
      </p>
      <p className="c9">
        <span className="c5">
          회사는 이용자의 개인정보를 원칙적으로 고지 및 약정한 기간 동안 보유 및
          이용하며 개인정보의 수집 및 이용목적이 달성되거나 이용자의 파기 요청이
          있는 경우 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로
          명시한 기간 동안 보존합니다.
        </span>
      </p>
      <ol className="c2 lst-kix_d2w9oda663hc-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">가. 관계법령 및 회사 방침에 의한 정보보유 사유</span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">
          관계법령의 규정에 의하여 보존할 필요가 있는 경우 법령에서 규정한 바에 따라
          이용자의 개인정보를 보관하며 마케팅 등 다른 목적으로 이용하지 않습니다.
        </span>
      </p>
      <ol className="c2 lst-kix_sox39945nbss-0 start" start={1}>
        <li className="c19 c28 li-bullet-0">
          <span className="c5">1) 관계법령에 따른 정보보유 사유</span>
        </li>
      </ol>
      <a id="t.8598f61c0b5e071d7dd9745373dfac885bdeb7f5" />
      <a id="t.1" />
      <table className="c30">
        <tbody>
          <tr className="c26">
            <td className="c4 c18" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">관계법령</span>
              </p>
            </td>
            <td className="c4 c18" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">목적</span>
              </p>
            </td>
            <td className="c4 c18" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">수집항목</span>
              </p>
            </td>
            <td className="c4 c18" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">보유기간</span>
              </p>
            </td>
          </tr>
          <tr className="c11">
            <td className="c4" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">통신비밀보호법</span>
              </p>
            </td>
            <td className="c4" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">
                  법원의 영장을 받아 수사기관이 요청 시 제공
                </span>
              </p>
            </td>
            <td className="c4" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">로그기록, IP 등</span>
              </p>
            </td>
            <td className="c4" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">3개월</span>
              </p>
            </td>
          </tr>
          <tr className="c24">
            <td className="c1" colSpan={1} rowSpan={2}>
              <p className="c0">
                <span className="c7">국세기본법</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">국세부과 제척기간 계산</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">국세증빙자료 등</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">10년</span>
              </p>
            </td>
          </tr>
          <tr className="c25">
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">국세징수권 등 소명시효 계산</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">과세표준과 세액의 신고자료 등</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">5년</span>
              </p>
            </td>
          </tr>
          <tr className="c32">
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">부가가치세법</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">
                  장부, 세금계산서, 수입세금계산서, 영수증 등
                </span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">
                  부가가치세의 과세표준과 세액의 신교자료 등
                </span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">5년</span>
              </p>
            </td>
          </tr>
          <tr className="c20">
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">전자금융거래법</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">전자금융거래기록확인</span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">
                  전자금융거래에 관한 기록, 상대방에 대한 정도 등
                </span>
              </p>
            </td>
            <td className="c1" colSpan={1} rowSpan={1}>
              <p className="c0">
                <span className="c7">5년</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="c9 c29">
        <span className="c5">&nbsp;</span>
      </p>
      <ol className="c2 lst-kix_42zj56m5jwjj-1 start" start={2}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            2) 회사 방침에 의한 정보보유 사유 회원 본인확인을 위해 가입 시 수집한
            정보는 탈퇴하는 경우 6개월 이후, 반려된 경우에는 1개월 이후 개인정보를
            삭제합니다.
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_42zj56m5jwjj-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            나. 수집된 개인정보의 보유·이용기간은 서비스이용계약체결(회원가입)시부터
            서비스이용계약해지(탈퇴신청, 직권탈퇴 포함)입니다. 또한 동의 해지 시
            회사는 이용자의 개인정보를 상기 명시한 정보보유 사유에 따라 일정 기간
            저장하는 자료를 제외하고는 지체 없이 파기하며 개인정보처리가 제3자에게
            위탁된 경우에는 수탁자에게도 파기하도록 지시합니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            다. 회사는 1년 동안 회사의 서비스를 이용하지 않은 이용자의 개인정보는
            ‘정보통신망 이용촉진 및 정보보호등에 관한 법률 제29조’ 에 근거하여
            이용자에게 사전통지하고 개인정보를 파기하거나 별도로 분리하여 저장
            관리합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우
            관계법령에서 규정한 일정한 기간 동안 이용자 개인정보를 보관합니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            라. 회사는 다항 기간 만료 30일 전까지 개인정보가 파기되거나 분리되어
            저장•관리되는 사실과 기간 만료일 및 해당 개인정보의 항목을 공지사항,
            전자우편 등의 방법으로 이용자에게 알립니다. 이를 위해 이용자는 회사에
            정확한 연락처 정보를 제공/수정하여야 합니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">마. 파기방법</span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">
          이용자의 개인정보는 수집 및 이용목적이 달성된 후에는 지체 없이 파기됩니다.
          종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기하고,
          전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법 또는
          물리적 방법을 사용하여 파기합니다.
        </span>
      </p>
      <p className="c9">
        <span className="c5">5. 쿠키(Cookie)의 운용 및 거부</span>
      </p>
      <ol className="c2 lst-kix_lu7dkr5y11op-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">가. 쿠키의 사용 목적</span>
        </li>
      </ol>
      <ol className="c2 lst-kix_lu7dkr5y11op-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            1) 회사는 회사가 운영하는 인터넷 사이트에서 개인 맞춤 서비스를 제공하기
            위해 이용 정보를 저장하는 ‘쿠키(cookie)’를 사용합니다. 쿠키는 웹사이트
            서버가 이용자의 브라우저에게 전송하는 소량의 정보로서 이용자 컴퓨터의
            하드디스크에 저장됩니다.
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">
            2) 회사는 쿠키의 사용을 통해서만 가능한 특정된 맞춤형 서비스를 제공할 수
            있습니다.
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">
            3) 회사는 회원을 식별하고 회원의 로그인 상태를 유지하기 위해 쿠키를
            사용할 수 있습니다.
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_lu7dkr5y11op-0" start={2}>
        <li className="c10 li-bullet-0">
          <span className="c5">나. 쿠키의 설치/운용 및 거부</span>
        </li>
      </ol>
      <ol className="c2 lst-kix_lu7dkr5y11op-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            1) 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는
            웹브라우저에서 옵션을 조정함으로써 모든 쿠키를 허용/거부하거나, 쿠키가
            저장될 때마다 확인을 거치도록 할 수 있습니다.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">
          - 쿠키 설치 허용 여부를 지정하는 방법(Internet Explorer의 경우)은 다음과
          같습니다.
        </span>
      </p>
      <ul className="c2 lst-kix_otjcddvhxh24-2 start">
        <li className="c31 li-bullet-0">
          <span className="c5">[도구] 메뉴에서 [인터넷 옵션]을 선택합니다.</span>
        </li>
        <li className="c31 li-bullet-0">
          <span className="c5">[개인정보 탭]을 클릭합니다.</span>
        </li>
        <li className="c31 li-bullet-0">
          <span className="c5">[개인정보처리 수준]을 설정하시면 됩니다.</span>
        </li>
      </ul>
      <ol className="c2 lst-kix_otjcddvhxh24-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            2) 쿠키의 저장을 거부할 경우에는 개인 맞춤서비스 등 회사가 제공하는 일부
            서비스는 이용이 어려울 수 있습니다.
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">
            3) 맞춤형 광고에 대한 상세내용은 링크를 통해 확인하시기 바랍니다.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">6. 이용자의 권리</span>
      </p>
      <ol className="c2 lst-kix_awxmkbtjh40q-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            가. 이용자는 언제든지 개인정보고객센터를 통하여 회원님의 개인정보를
            열람, 정정 처리하실 수 있으며 전자우편 또는 서면으로 요청하신 경우 열람,
            정정, 삭제 처리해드리겠습니다. 이용자의 개인정보가 제3자에게 제공되거나
            처리 위탁된 경우 이용자는 회사 또는 ‘제3자’/’수탁자’에게 파기를 요청할
            수 있습니다. 단, 회원 아이디(ID), 성명은 정정이 불가능하며, 개명으로
            인한 성명 변경 및 행정상의 문제로 인한 사업자등록번호 변경은 예외적으로
            허용 될 수 있습니다. 기타 법률에 따라 정정 또는 삭제가 금지되거나
            제한되어 있는 경우에는 해당 처리가 제한될 수 있습니다. 또한 개인정보
            오류에 대한 정정 요청한 경우에는 다른 법률에 따라 개인정보의 제공을 요청
            받는 경우가 아닌 한 정정을 완료하기 전까지 당해 개인정보를 이용 또는
            제공하지 않습니다, 만약 잘못된 개인정보를 이미 제공한 경우에는 정정 처리
            결과를 제 3자에게 통지하여 정정이 이루어지도록 하겠습니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            나. 이용자는 언제든지 이카루스 마케팅 플랫폼 사이트의 개인정보에 대하여
            처리의 정지를 요구 할 수 있습니다. 다만 아래의 경우에 해당하는 경우
            처리정지 요구를 거절할 수 있습니다.
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_awxmkbtjh40q-1 start" start={1}>
        <li className="c3 li-bullet-0">
          <span className="c5">
            1) 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한
            경우
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">
            2) 다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의
            이익을 부당하게 침해할 우려가 있는 경우
          </span>
        </li>
        <li className="c3 li-bullet-0">
          <span className="c5">
            3) 개인정보를 처리하지 아니하면 정보주체와 약정한 서비스를 제공하지
            못하는 등 계약의 이행이 곤란한 경우로서 정보주체가 그 계약의 해지 의사를
            명확하게 밝히지 아니한 경우
          </span>
        </li>
      </ol>
      <ol className="c2 lst-kix_awxmkbtjh40q-0" start={3}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            다. 회원가입 등을 통해 개인정보의 수집·이용·제공에 대해 회원님께서
            동의하신 내용을 언제든지 철회할 수 있습니다. 동의철회는 회사 사이트 내
            “회원 탈퇴 신청”을 클릭하거나 서면, 이메일 등으로 연락하시면 지체 없이
            개인정보의 삭제 등 필요한 조치를 하겠습니다. 다만 법률 또는 약관의
            규정에 따라 회사가 회원님의 개인정보를 보존하여야 하는 경우에는 해당
            처리가 제한될 수 있습니다. 이 경우 회원님은 본인 식별을 위하여 반드시
            회원아이디(ID)와 본인확인 식별정보를 밝히셔야 하며, 철회로 인해 서비스에
            다소 제약이 있거나 일부 서비스를 이용하지 못하실 수 있습니다.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">7. 이용자의 의무</span>
      </p>
      <p className="c9">
        <span className="c5">
          이용자는 자신의 개인정보를 보호할 의무가 있으며, 회사의 귀책사유가 없이
          ID, 비밀번호, 접근매체 등의 양도•대여•분실이나 로그인 상태에서 이석 등
          이용자 본인의 부주의나 관계법령에 의한 보안조치로 차단할 수 없는 방법이나
          기술을 사용한 해킹 등 회사가 상당한 주의에도 불구하고 통제할 수 없는
          인터넷 상의 문제 등으로 개인정보가 유출되어 발생한 문제에 대해 회사는
          책임을 지지 않습니다.
        </span>
      </p>
      <ol className="c2 lst-kix_mxvknv8rirov-0 start" start={1}>
        <li className="c10 li-bullet-0">
          <span className="c5">
            가. 이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 이용자의
            부정확한 정보 입력으로 발생하는 문제의 책임은 이용자 자신에게 있습니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            나. 타인의 개인정보를 도용한 회원가입 또는 ID등을 도용하여 결제 처리 시
            이용자자격 상실과 함께 관계법령에 의거하여 처벌될 수 있습니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            다. 이용자는 아이디, 비밀번호 등에 대해 보안을 유지할 책임이 있으며
            제3자에게 이를 양도하거나 대여할 수 없습니다. 이용자는 회사의
            개인정보보호정책에 따라 보안을 위해 비밀번호의 주기적 변경에 협조할
            의무가 있습니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            라. 이용자는 회사의 서비스를 이용한 후에는 반드시 로그인 계정을 종료하고
            웹 브라우저 프로그램을 종료해야 합니다.
          </span>
        </li>
        <li className="c10 li-bullet-0">
          <span className="c5">
            마. 이용자는 "정보 통신망 이용촉진 및 정보보호 등에 관한 법률",
            “개인정보보호법”, 등 기타 개인정보에 관한 법률을 준수하여야 합니다.
          </span>
        </li>
      </ol>
      <p className="c9">
        <span className="c5">8. 링크 사이트에 대한 책임</span>
      </p>
      <p className="c9">
        <span className="c5">
          회사는 이용자에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다. 다만,
          링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본
          "개인정보처리방침"이 적용되지 않습니다.
        </span>
      </p>
      <p className="c9">
        <span className="c5">9. 개인정보의 기술적/관리적 보호 대책</span>
      </p>
      <p className="c9">
        <span className="c5">
          회사는 이용자들의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출,
          변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적
          보호대책을 강구하고 있습니다.
        </span>
      </p>
      <p className="c9">
        <span className="c5">가. 개인정보의 암호화</span>
      </p>
      <p className="c9">
        <span className="c5">
          이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의
          확인 및 변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다. 비밀번호는
          이용자의 생일, 전화번호 등 타인이 추측하기 쉬운 숫자 등을 이용하지 않도록
          비밀번호 생성규칙을 수립하여 적용하고 있습니다. 비밀번호 등의 개인정보는
          안전한 암호 알고리즘으로 암호화되어 저장 및 관리되고 있습니다.
        </span>
      </p>
      <p className="c9">
        <span className="c5">나. 해킹 등에 대비한 대책</span>
      </p>
      <p className="c9">
        <span className="c5">
          회사는 해킹 등 회사 정보통신망 침입에 의해 이용자의 개인정보가 유출되는
          것을 방지하기 위해 침입탐지 및 침입차단 시스템을 24시간 가동하고 있습니다.
          만일의 사태에 대비하여 모든 침입탐지 시스템과 침입차단 시스템은 이중화로
          구성하여 운영하고 있으며, 민감한 개인정보는 암호화 통신 등을 통하여
          네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다.
        </span>
      </p>
      <p className="c9">
        <span className="c5">다. 개인정보 취급자의 최소화 및 교육</span>
      </p>
      <p className="c9">
        <span className="c5">
          회사는 회사의 개인정보 취급자를 최소한으로 제한하며, 개인정보 취급자에
          대한 교육 등 관리적 조치를 통해 개인정보보호의 중요성을 인식시키고
          있습니다.
        </span>
      </p>
      <p className="c9">
        <span className="c5">라. 개인정보보호 전담부서의 운영</span>
      </p>
      <p className="c9">
        <span className="c5">
          회사는 개인정보의 효율적 보호를 위해 개인정보보호전담부서를 운영하고
          있으며, 개인정보처리방침의 이행사항 및 개인정보 취급자의 준수여부를
          확인하여 문제가 발견될 경우 즉시 수정할 수 있도록 노력하고 있습니다.
        </span>
      </p>
      <p className="c9">
        <span className="c5">10. 개인정보 보호책임자</span>
      </p>
      <p className="c9">
        <span className="c5">
          회사는 이용자가 회사의 서비스를 안전하게 이용할 수 있도록 최선을 다하고
          있습니다. 이용자는 회사의 서비스 이용과 관련한 모든 개인정보보호 민원을
          전담부서로 신고하실 수 있으며, 회사는 이용자의 신고사항에 대해 신속하고
          성실하게 답변해드리고 있습니다.
        </span>
      </p>
      <p className="c9">
        <span className="c5">[개인정보 보호책임자]</span>
      </p>
      <p className="c9">
        <span className="c5">성명: 이진희</span>
      </p>
      <p className="c9">
        <span className="c5">소속부서: 개인정보 보호팀</span>
      </p>
      <p className="c9">
        <span className="c5">전자우편: lubme520@naver.com</span>
      </p>
      <p className="c9">
        <span className="c5">전화번호: 044-864-9984</span>
      </p>
      <p className="c9">
        <span className="c5">
          ※ 상기 연락처 등은 “개인정보보호 전담 고객센터”로 연결됩니다.
        </span>
      </p>
      <p className="c9">
        <span className="c5">
          기타 개인정보침해에 대한 신고 또는 상담이 필요하신 경우에는 아래 기관으로
          문의하시기 바랍니다.
        </span>
      </p>
      <p className="c9">
        <span className="c5">
          - 개인정보분쟁조정위원회 / www.kopico.go.kr / 1833-6972
        </span>
      </p>
      <p className="c9">
        <span className="c5">
          - 개인정보침해신고센터 / privacy.kisa.or.kr / (국번없이) 118
        </span>
      </p>
      <p className="c9">
        <span className="c5">
          - 대검찰청 첨단범죄수사센터 / www.spo.go.kr / (국번없이) 1301
        </span>
      </p>
      <p className="c9">
        <span className="c5">
          - 경찰청 사이버안전국 / cyberbureau.police.go.kr / (국번없이) 182
        </span>
      </p>
      <p className="c9">
        <span className="c5">11. 고지의 의무</span>
      </p>
      <p className="c9">
        <span className="c5">
          본 개인정보처리방침은 관계법령 및 지침의 변경 또는 회사의 필요 등에 의하여
          내용의 추가, 삭제 및 수정이 생길 수 있습니다. 이 경우 최소 7일 전에
          홈페이지 또는 이메일을 통해 사전 공지하고 사전 공지가 곤란한 경우 지체
          없이 공지하며, 별도 공지가 없는 한 7일이 경과된 후에 시행됩니다. 다만,
          중대한 내용이 변경되는 경우에는 최소 30일 전에 공지하고, 별도 공지가 없는
          한 30일이 경과된 후에 시행됩니다. 또한 당사는 관계법령에 따라 필요한 경우
          고객의 별도 동의를 받을 수 있습니다.
        </span>
      </p>
      <p className="c9">
        <span className="c14">공고 일자: {formatDateWithLabels()}</span>
      </p>
      <p className="c9">
        <span className="c14">시행 일자: {formatDateWithLabels()}</span>
      </p>
      <p className="c8">
        <span className="c15">&nbsp;</span>
      </p>
      <p className="c13">
        <span className="c15" />
      </p>
    </>
    }
  </>
  );
}

export default PrivacyPolicy
