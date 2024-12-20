import { formatDateWithLabels } from '@src/utils/formatter';
import React from 'react'
import useAuth from "@src/hooks/useAuth";


function TermsOfUse() {
  const { lang } = useAuth();
  const isEnglish = lang == 'en'

  return (
    <>
      <meta content="text/html; charset=UTF-8" httpEquiv="content-type" />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            '.lst-kix_4wleabl6qpn9-1>li:before{content:"" counter(lst-ctn-kix_4wleabl6qpn9-1,lower-latin) ". "}.lst-kix_4wleabl6qpn9-3>li:before{content:"" counter(lst-ctn-kix_4wleabl6qpn9-3,decimal) ". "}.lst-kix_4wleabl6qpn9-2>li:before{content:"" counter(lst-ctn-kix_4wleabl6qpn9-2,lower-roman) ". "}ol.lst-kix_6xlv5a4aatsk-7.start{counter-reset:lst-ctn-kix_6xlv5a4aatsk-7 0}.lst-kix_1if9dzlexiok-2>li{counter-increment:lst-ctn-kix_1if9dzlexiok-2}.lst-kix_4wleabl6qpn9-5>li:before{content:"" counter(lst-ctn-kix_4wleabl6qpn9-5,lower-roman) ". "}.lst-kix_4wleabl6qpn9-4>li:before{content:"" counter(lst-ctn-kix_4wleabl6qpn9-4,lower-latin) ". "}.lst-kix_gcnk1726ag0y-0>li:before{content:"" counter(lst-ctn-kix_gcnk1726ag0y-0,decimal) ". "}ol.lst-kix_9lbtd2o11732-4.start{counter-reset:lst-ctn-kix_9lbtd2o11732-4 0}.lst-kix_gcnk1726ag0y-2>li{counter-increment:lst-ctn-kix_gcnk1726ag0y-2}ol.lst-kix_4wleabl6qpn9-6.start{counter-reset:lst-ctn-kix_4wleabl6qpn9-6 0}.lst-kix_gcnk1726ag0y-1>li:before{content:"" counter(lst-ctn-kix_gcnk1726ag0y-1,decimal) ". "}.lst-kix_4wleabl6qpn9-6>li:before{content:"" counter(lst-ctn-kix_4wleabl6qpn9-6,decimal) ". "}.lst-kix_jryf0al0udev-6>li{counter-increment:lst-ctn-kix_jryf0al0udev-6}.lst-kix_gcnk1726ag0y-4>li:before{content:"" counter(lst-ctn-kix_gcnk1726ag0y-4,lower-latin) ". "}.lst-kix_4wleabl6qpn9-7>li:before{content:"" counter(lst-ctn-kix_4wleabl6qpn9-7,lower-latin) ". "}.lst-kix_gcnk1726ag0y-2>li:before{content:"" counter(lst-ctn-kix_gcnk1726ag0y-2,lower-roman) ". "}.lst-kix_gcnk1726ag0y-3>li:before{content:"" counter(lst-ctn-kix_gcnk1726ag0y-3,decimal) ". "}.lst-kix_4wleabl6qpn9-8>li:before{content:"" counter(lst-ctn-kix_4wleabl6qpn9-8,lower-roman) ". "}ol.lst-kix_9z7ttbbevln3-6.start{counter-reset:lst-ctn-kix_9z7ttbbevln3-6 0}.lst-kix_9z7ttbbevln3-8>li{counter-increment:lst-ctn-kix_9z7ttbbevln3-8}.lst-kix_6ube3zqa3pt2-5>li{counter-increment:lst-ctn-kix_6ube3zqa3pt2-5}.lst-kix_9lbtd2o11732-0>li{counter-increment:lst-ctn-kix_9lbtd2o11732-0}ol.lst-kix_1if9dzlexiok-4.start{counter-reset:lst-ctn-kix_1if9dzlexiok-4 0}ol.lst-kix_10h1fv8hz3aq-8.start{counter-reset:lst-ctn-kix_10h1fv8hz3aq-8 0}ol.lst-kix_6ube3zqa3pt2-7.start{counter-reset:lst-ctn-kix_6ube3zqa3pt2-7 0}ol.lst-kix_jryf0al0udev-7.start{counter-reset:lst-ctn-kix_jryf0al0udev-7 0}.lst-kix_10h1fv8hz3aq-7>li{counter-increment:lst-ctn-kix_10h1fv8hz3aq-7}ol.lst-kix_gcnk1726ag0y-1.start{counter-reset:lst-ctn-kix_gcnk1726ag0y-1 0}.lst-kix_jvq872n28gbj-6>li{counter-increment:lst-ctn-kix_jvq872n28gbj-6}ol.lst-kix_bwulzs2i1l18-4.start{counter-reset:lst-ctn-kix_bwulzs2i1l18-4 0}.lst-kix_10h1fv8hz3aq-3>li{counter-increment:lst-ctn-kix_10h1fv8hz3aq-3}.lst-kix_gcnk1726ag0y-6>li{counter-increment:lst-ctn-kix_gcnk1726ag0y-6}.lst-kix_4wleabl6qpn9-7>li{counter-increment:lst-ctn-kix_4wleabl6qpn9-7}.lst-kix_bwulzs2i1l18-3>li{counter-increment:lst-ctn-kix_bwulzs2i1l18-3}.lst-kix_9lbtd2o11732-7>li{counter-increment:lst-ctn-kix_9lbtd2o11732-7}ol.lst-kix_v1ruob1mbwh3-5.start{counter-reset:lst-ctn-kix_v1ruob1mbwh3-5 0}.lst-kix_v1ruob1mbwh3-3>li:before{content:"" counter(lst-ctn-kix_v1ruob1mbwh3-3,decimal) ". "}ol.lst-kix_9z7ttbbevln3-1.start{counter-reset:lst-ctn-kix_9z7ttbbevln3-1 0}.lst-kix_v1ruob1mbwh3-4>li:before{content:"" counter(lst-ctn-kix_v1ruob1mbwh3-4,lower-latin) ". "}.lst-kix_v1ruob1mbwh3-5>li:before{content:"" counter(lst-ctn-kix_v1ruob1mbwh3-5,lower-roman) ". "}ol.lst-kix_4wleabl6qpn9-1.start{counter-reset:lst-ctn-kix_4wleabl6qpn9-1 0}.lst-kix_v1ruob1mbwh3-6>li:before{content:"" counter(lst-ctn-kix_v1ruob1mbwh3-6,decimal) ". "}.lst-kix_v1ruob1mbwh3-8>li:before{content:"" counter(lst-ctn-kix_v1ruob1mbwh3-8,lower-roman) ". "}ol.lst-kix_10h1fv8hz3aq-3.start{counter-reset:lst-ctn-kix_10h1fv8hz3aq-3 0}ol.lst-kix_n291az369z9f-3.start{counter-reset:lst-ctn-kix_n291az369z9f-3 0}.lst-kix_v1ruob1mbwh3-7>li:before{content:"" counter(lst-ctn-kix_v1ruob1mbwh3-7,lower-latin) ". "}ol.lst-kix_6xlv5a4aatsk-2.start{counter-reset:lst-ctn-kix_6xlv5a4aatsk-2 0}ol.lst-kix_gcnk1726ag0y-6.start{counter-reset:lst-ctn-kix_gcnk1726ag0y-6 0}.lst-kix_4wleabl6qpn9-0>li:before{content:"" counter(lst-ctn-kix_4wleabl6qpn9-0,decimal) ". "}ol.lst-kix_1if9dzlexiok-6{list-style-type:none}ol.lst-kix_1if9dzlexiok-7{list-style-type:none}ol.lst-kix_1if9dzlexiok-4{list-style-type:none}ol.lst-kix_1if9dzlexiok-5{list-style-type:none}ol.lst-kix_1if9dzlexiok-2{list-style-type:none}.lst-kix_9z7ttbbevln3-4>li{counter-increment:lst-ctn-kix_9z7ttbbevln3-4}ol.lst-kix_1if9dzlexiok-3{list-style-type:none}ol.lst-kix_1if9dzlexiok-0{list-style-type:none}ol.lst-kix_1if9dzlexiok-1{list-style-type:none}ol.lst-kix_1if9dzlexiok-8{list-style-type:none}.lst-kix_6xlv5a4aatsk-3>li{counter-increment:lst-ctn-kix_6xlv5a4aatsk-3}ol.lst-kix_10h1fv8hz3aq-1.start{counter-reset:lst-ctn-kix_10h1fv8hz3aq-1 0}.lst-kix_4wleabl6qpn9-3>li{counter-increment:lst-ctn-kix_4wleabl6qpn9-3}.lst-kix_9lbtd2o11732-4>li{counter-increment:lst-ctn-kix_9lbtd2o11732-4}.lst-kix_v1ruob1mbwh3-1>li:before{content:"" counter(lst-ctn-kix_v1ruob1mbwh3-1,lower-latin) ". "}.lst-kix_1if9dzlexiok-6>li{counter-increment:lst-ctn-kix_1if9dzlexiok-6}.lst-kix_jryf0al0udev-2>li{counter-increment:lst-ctn-kix_jryf0al0udev-2}ol.lst-kix_10h1fv8hz3aq-6{list-style-type:none}ol.lst-kix_10h1fv8hz3aq-7{list-style-type:none}.lst-kix_9z7ttbbevln3-5>li{counter-increment:lst-ctn-kix_9z7ttbbevln3-5}ol.lst-kix_9lbtd2o11732-6.start{counter-reset:lst-ctn-kix_9lbtd2o11732-6 0}ol.lst-kix_10h1fv8hz3aq-8{list-style-type:none}.lst-kix_6ube3zqa3pt2-2>li{counter-increment:lst-ctn-kix_6ube3zqa3pt2-2}ol.lst-kix_10h1fv8hz3aq-0{list-style-type:none}ol.lst-kix_10h1fv8hz3aq-1{list-style-type:none}ol.lst-kix_bwulzs2i1l18-2.start{counter-reset:lst-ctn-kix_bwulzs2i1l18-2 0}ol.lst-kix_10h1fv8hz3aq-2{list-style-type:none}ol.lst-kix_10h1fv8hz3aq-3{list-style-type:none}ol.lst-kix_10h1fv8hz3aq-4{list-style-type:none}ol.lst-kix_n291az369z9f-5.start{counter-reset:lst-ctn-kix_n291az369z9f-5 0}.lst-kix_1if9dzlexiok-7>li:before{content:"" counter(lst-ctn-kix_1if9dzlexiok-7,lower-latin) ". "}ol.lst-kix_10h1fv8hz3aq-5{list-style-type:none}.lst-kix_v1ruob1mbwh3-3>li{counter-increment:lst-ctn-kix_v1ruob1mbwh3-3}ol.lst-kix_n291az369z9f-8.start{counter-reset:lst-ctn-kix_n291az369z9f-8 0}.lst-kix_1if9dzlexiok-5>li:before{content:"" counter(lst-ctn-kix_1if9dzlexiok-5,lower-roman) ". "}ol.lst-kix_jvq872n28gbj-8.start{counter-reset:lst-ctn-kix_jvq872n28gbj-8 0}ol.lst-kix_gcnk1726ag0y-8.start{counter-reset:lst-ctn-kix_gcnk1726ag0y-8 0}ol.lst-kix_4wleabl6qpn9-4.start{counter-reset:lst-ctn-kix_4wleabl6qpn9-4 0}ol.lst-kix_1if9dzlexiok-2.start{counter-reset:lst-ctn-kix_1if9dzlexiok-2 0}.lst-kix_jryf0al0udev-3>li{counter-increment:lst-ctn-kix_jryf0al0udev-3}.lst-kix_n291az369z9f-4>li{counter-increment:lst-ctn-kix_n291az369z9f-4}ol.lst-kix_6ube3zqa3pt2-2{list-style-type:none}ol.lst-kix_6ube3zqa3pt2-1{list-style-type:none}ol.lst-kix_6ube3zqa3pt2-0{list-style-type:none}.lst-kix_gcnk1726ag0y-5>li:before{content:"" counter(lst-ctn-kix_gcnk1726ag0y-5,lower-roman) ". "}ol.lst-kix_4wleabl6qpn9-4{list-style-type:none}ol.lst-kix_4wleabl6qpn9-5{list-style-type:none}.lst-kix_bwulzs2i1l18-4>li{counter-increment:lst-ctn-kix_bwulzs2i1l18-4}ol.lst-kix_4wleabl6qpn9-2{list-style-type:none}ol.lst-kix_v1ruob1mbwh3-7.start{counter-reset:lst-ctn-kix_v1ruob1mbwh3-7 0}ol.lst-kix_4wleabl6qpn9-3{list-style-type:none}ol.lst-kix_4wleabl6qpn9-0{list-style-type:none}ol.lst-kix_4wleabl6qpn9-1{list-style-type:none}.lst-kix_v1ruob1mbwh3-4>li{counter-increment:lst-ctn-kix_v1ruob1mbwh3-4}.lst-kix_gcnk1726ag0y-7>li:before{content:"" counter(lst-ctn-kix_gcnk1726ag0y-7,lower-latin) ". "}ol.lst-kix_jvq872n28gbj-0{list-style-type:none}ol.lst-kix_jvq872n28gbj-1{list-style-type:none}ol.lst-kix_jvq872n28gbj-2{list-style-type:none}ol.lst-kix_4wleabl6qpn9-8{list-style-type:none}ol.lst-kix_jvq872n28gbj-3{list-style-type:none}ol.lst-kix_6xlv5a4aatsk-5.start{counter-reset:lst-ctn-kix_6xlv5a4aatsk-5 0}ol.lst-kix_jvq872n28gbj-4{list-style-type:none}ol.lst-kix_4wleabl6qpn9-6{list-style-type:none}ol.lst-kix_jvq872n28gbj-5{list-style-type:none}ol.lst-kix_4wleabl6qpn9-7{list-style-type:none}.lst-kix_6ube3zqa3pt2-1>li{counter-increment:lst-ctn-kix_6ube3zqa3pt2-1}ol.lst-kix_jvq872n28gbj-6{list-style-type:none}ol.lst-kix_6ube3zqa3pt2-6{list-style-type:none}ol.lst-kix_jvq872n28gbj-7{list-style-type:none}ol.lst-kix_6ube3zqa3pt2-5{list-style-type:none}ol.lst-kix_jvq872n28gbj-8{list-style-type:none}ol.lst-kix_6ube3zqa3pt2-4{list-style-type:none}.lst-kix_1if9dzlexiok-5>li{counter-increment:lst-ctn-kix_1if9dzlexiok-5}ol.lst-kix_6ube3zqa3pt2-3{list-style-type:none}ol.lst-kix_6ube3zqa3pt2-8{list-style-type:none}ol.lst-kix_6ube3zqa3pt2-7{list-style-type:none}ol.lst-kix_1if9dzlexiok-7.start{counter-reset:lst-ctn-kix_1if9dzlexiok-7 0}ol.lst-kix_jvq872n28gbj-1.start{counter-reset:lst-ctn-kix_jvq872n28gbj-1 0}.lst-kix_10h1fv8hz3aq-6>li{counter-increment:lst-ctn-kix_10h1fv8hz3aq-6}.lst-kix_9lbtd2o11732-0>li:before{content:"" counter(lst-ctn-kix_9lbtd2o11732-0,decimal) ". "}ol.lst-kix_bwulzs2i1l18-6.start{counter-reset:lst-ctn-kix_bwulzs2i1l18-6 0}ol.lst-kix_n291az369z9f-6.start{counter-reset:lst-ctn-kix_n291az369z9f-6 0}ol.lst-kix_6xlv5a4aatsk-4.start{counter-reset:lst-ctn-kix_6xlv5a4aatsk-4 0}.lst-kix_9lbtd2o11732-4>li:before{content:"" counter(lst-ctn-kix_9lbtd2o11732-4,lower-latin) ". "}.lst-kix_9lbtd2o11732-3>li:before{content:"" counter(lst-ctn-kix_9lbtd2o11732-3,decimal) ". "}.lst-kix_n291az369z9f-3>li{counter-increment:lst-ctn-kix_n291az369z9f-3}.lst-kix_jryf0al0udev-5>li{counter-increment:lst-ctn-kix_jryf0al0udev-5}.lst-kix_10h1fv8hz3aq-2>li:before{content:"" counter(lst-ctn-kix_10h1fv8hz3aq-2,lower-roman) ". "}ol.lst-kix_jryf0al0udev-4.start{counter-reset:lst-ctn-kix_jryf0al0udev-4 0}ol.lst-kix_jryf0al0udev-5{list-style-type:none}.lst-kix_n291az369z9f-1>li{counter-increment:lst-ctn-kix_n291az369z9f-1}ol.lst-kix_jryf0al0udev-6{list-style-type:none}ol.lst-kix_jryf0al0udev-7{list-style-type:none}.lst-kix_9lbtd2o11732-7>li:before{content:"" counter(lst-ctn-kix_9lbtd2o11732-7,lower-latin) ". "}ol.lst-kix_jryf0al0udev-8{list-style-type:none}.lst-kix_9lbtd2o11732-8>li:before{content:"" counter(lst-ctn-kix_9lbtd2o11732-8,lower-roman) ". "}.lst-kix_10h1fv8hz3aq-3>li:before{content:"" counter(lst-ctn-kix_10h1fv8hz3aq-3,decimal) ". "}.lst-kix_10h1fv8hz3aq-7>li:before{content:"" counter(lst-ctn-kix_10h1fv8hz3aq-7,lower-latin) ". "}.lst-kix_6ube3zqa3pt2-8>li{counter-increment:lst-ctn-kix_6ube3zqa3pt2-8}ol.lst-kix_jryf0al0udev-0{list-style-type:none}.lst-kix_10h1fv8hz3aq-4>li{counter-increment:lst-ctn-kix_10h1fv8hz3aq-4}.lst-kix_10h1fv8hz3aq-6>li:before{content:"" counter(lst-ctn-kix_10h1fv8hz3aq-6,decimal) ". "}ol.lst-kix_jryf0al0udev-1{list-style-type:none}ol.lst-kix_jryf0al0udev-2{list-style-type:none}ol.lst-kix_jryf0al0udev-3{list-style-type:none}ol.lst-kix_jryf0al0udev-4{list-style-type:none}ol.lst-kix_jryf0al0udev-5.start{counter-reset:lst-ctn-kix_jryf0al0udev-5 0}.lst-kix_1if9dzlexiok-2>li:before{content:"" counter(lst-ctn-kix_1if9dzlexiok-2,lower-roman) ". "}ol.lst-kix_9lbtd2o11732-2.start{counter-reset:lst-ctn-kix_9lbtd2o11732-2 0}.lst-kix_1if9dzlexiok-3>li:before{content:"" counter(lst-ctn-kix_1if9dzlexiok-3,decimal) ". "}.lst-kix_jvq872n28gbj-0>li{counter-increment:lst-ctn-kix_jvq872n28gbj-0}ol.lst-kix_jvq872n28gbj-6.start{counter-reset:lst-ctn-kix_jvq872n28gbj-6 0}.lst-kix_bwulzs2i1l18-2>li{counter-increment:lst-ctn-kix_bwulzs2i1l18-2}ol.lst-kix_4wleabl6qpn9-8.start{counter-reset:lst-ctn-kix_4wleabl6qpn9-8 0}.lst-kix_jvq872n28gbj-7>li{counter-increment:lst-ctn-kix_jvq872n28gbj-7}ol.lst-kix_jvq872n28gbj-7.start{counter-reset:lst-ctn-kix_jvq872n28gbj-7 0}ol.lst-kix_9lbtd2o11732-1.start{counter-reset:lst-ctn-kix_9lbtd2o11732-1 0}ol.lst-kix_1if9dzlexiok-6.start{counter-reset:lst-ctn-kix_1if9dzlexiok-6 0}ol.lst-kix_jvq872n28gbj-0.start{counter-reset:lst-ctn-kix_jvq872n28gbj-0 0}.lst-kix_jryf0al0udev-7>li{counter-increment:lst-ctn-kix_jryf0al0udev-7}.lst-kix_n291az369z9f-8>li{counter-increment:lst-ctn-kix_n291az369z9f-8}ol.lst-kix_6xlv5a4aatsk-0.start{counter-reset:lst-ctn-kix_6xlv5a4aatsk-0 0}.lst-kix_1if9dzlexiok-7>li{counter-increment:lst-ctn-kix_1if9dzlexiok-7}ol.lst-kix_jryf0al0udev-0.start{counter-reset:lst-ctn-kix_jryf0al0udev-0 0}.lst-kix_9z7ttbbevln3-1>li:before{content:"" counter(lst-ctn-kix_9z7ttbbevln3-1,lower-latin) ". "}.lst-kix_jryf0al0udev-0>li{counter-increment:lst-ctn-kix_jryf0al0udev-0}.lst-kix_jvq872n28gbj-2>li{counter-increment:lst-ctn-kix_jvq872n28gbj-2}ol.lst-kix_9lbtd2o11732-4{list-style-type:none}.lst-kix_bwulzs2i1l18-0>li{counter-increment:lst-ctn-kix_bwulzs2i1l18-0}.lst-kix_v1ruob1mbwh3-2>li{counter-increment:lst-ctn-kix_v1ruob1mbwh3-2}ol.lst-kix_9lbtd2o11732-3{list-style-type:none}ol.lst-kix_9lbtd2o11732-2{list-style-type:none}ol.lst-kix_9lbtd2o11732-1{list-style-type:none}ol.lst-kix_9lbtd2o11732-0{list-style-type:none}ol.lst-kix_jryf0al0udev-3.start{counter-reset:lst-ctn-kix_jryf0al0udev-3 0}.lst-kix_6xlv5a4aatsk-3>li:before{content:"" counter(lst-ctn-kix_6xlv5a4aatsk-3,decimal) ". "}ol.lst-kix_9lbtd2o11732-8{list-style-type:none}ol.lst-kix_9lbtd2o11732-7{list-style-type:none}.lst-kix_v1ruob1mbwh3-2>li:before{content:"" counter(lst-ctn-kix_v1ruob1mbwh3-2,lower-roman) ". "}ol.lst-kix_9lbtd2o11732-6{list-style-type:none}ol.lst-kix_9lbtd2o11732-5{list-style-type:none}ol.lst-kix_bwulzs2i1l18-5.start{counter-reset:lst-ctn-kix_bwulzs2i1l18-5 0}ol.lst-kix_jvq872n28gbj-2.start{counter-reset:lst-ctn-kix_jvq872n28gbj-2 0}.lst-kix_4wleabl6qpn9-5>li{counter-increment:lst-ctn-kix_4wleabl6qpn9-5}.lst-kix_6xlv5a4aatsk-7>li:before{content:"" counter(lst-ctn-kix_6xlv5a4aatsk-7,lower-latin) ". "}.lst-kix_n291az369z9f-6>li{counter-increment:lst-ctn-kix_n291az369z9f-6}ol.lst-kix_n291az369z9f-2.start{counter-reset:lst-ctn-kix_n291az369z9f-2 0}ol.lst-kix_bwulzs2i1l18-8.start{counter-reset:lst-ctn-kix_bwulzs2i1l18-8 0}ol.lst-kix_jvq872n28gbj-5.start{counter-reset:lst-ctn-kix_jvq872n28gbj-5 0}ol.lst-kix_9lbtd2o11732-0.start{counter-reset:lst-ctn-kix_9lbtd2o11732-0 0}.lst-kix_1if9dzlexiok-6>li:before{content:"" counter(lst-ctn-kix_1if9dzlexiok-6,decimal) ". "}.lst-kix_jvq872n28gbj-7>li:before{content:"" counter(lst-ctn-kix_jvq872n28gbj-7,lower-latin) ". "}.lst-kix_9z7ttbbevln3-5>li:before{content:"" counter(lst-ctn-kix_9z7ttbbevln3-5,lower-roman) ". "}.lst-kix_v1ruob1mbwh3-0>li{counter-increment:lst-ctn-kix_v1ruob1mbwh3-0}ol.lst-kix_n291az369z9f-1.start{counter-reset:lst-ctn-kix_n291az369z9f-1 0}.lst-kix_jryf0al0udev-6>li:before{content:"" counter(lst-ctn-kix_jryf0al0udev-6,decimal) ". "}.lst-kix_6xlv5a4aatsk-1>li{counter-increment:lst-ctn-kix_6xlv5a4aatsk-1}.lst-kix_jvq872n28gbj-3>li:before{content:"" counter(lst-ctn-kix_jvq872n28gbj-3,decimal) ". "}.lst-kix_4wleabl6qpn9-0>li{counter-increment:lst-ctn-kix_4wleabl6qpn9-0}.lst-kix_6xlv5a4aatsk-6>li{counter-increment:lst-ctn-kix_6xlv5a4aatsk-6}.lst-kix_bwulzs2i1l18-5>li:before{content:"" counter(lst-ctn-kix_bwulzs2i1l18-5,lower-roman) ". "}ol.lst-kix_jryf0al0udev-1.start{counter-reset:lst-ctn-kix_jryf0al0udev-1 0}ol.lst-kix_1if9dzlexiok-8.start{counter-reset:lst-ctn-kix_1if9dzlexiok-8 0}.lst-kix_gcnk1726ag0y-8>li:before{content:"" counter(lst-ctn-kix_gcnk1726ag0y-8,lower-roman) ". "}.lst-kix_v1ruob1mbwh3-7>li{counter-increment:lst-ctn-kix_v1ruob1mbwh3-7}.lst-kix_gcnk1726ag0y-4>li{counter-increment:lst-ctn-kix_gcnk1726ag0y-4}.lst-kix_9lbtd2o11732-2>li{counter-increment:lst-ctn-kix_9lbtd2o11732-2}.lst-kix_bwulzs2i1l18-7>li{counter-increment:lst-ctn-kix_bwulzs2i1l18-7}ol.lst-kix_bwulzs2i1l18-7.start{counter-reset:lst-ctn-kix_bwulzs2i1l18-7 0}ol.lst-kix_jryf0al0udev-2.start{counter-reset:lst-ctn-kix_jryf0al0udev-2 0}ol.lst-kix_jvq872n28gbj-3.start{counter-reset:lst-ctn-kix_jvq872n28gbj-3 0}ol.lst-kix_n291az369z9f-0.start{counter-reset:lst-ctn-kix_n291az369z9f-0 0}.lst-kix_9z7ttbbevln3-1>li{counter-increment:lst-ctn-kix_9z7ttbbevln3-1}ol.lst-kix_9z7ttbbevln3-0.start{counter-reset:lst-ctn-kix_9z7ttbbevln3-0 0}ol.lst-kix_v1ruob1mbwh3-6.start{counter-reset:lst-ctn-kix_v1ruob1mbwh3-6 0}.lst-kix_bwulzs2i1l18-5>li{counter-increment:lst-ctn-kix_bwulzs2i1l18-5}.lst-kix_n291az369z9f-2>li{counter-increment:lst-ctn-kix_n291az369z9f-2}ol.lst-kix_10h1fv8hz3aq-2.start{counter-reset:lst-ctn-kix_10h1fv8hz3aq-2 0}ol.lst-kix_jvq872n28gbj-4.start{counter-reset:lst-ctn-kix_jvq872n28gbj-4 0}.lst-kix_jvq872n28gbj-8>li{counter-increment:lst-ctn-kix_jvq872n28gbj-8}ol.lst-kix_6ube3zqa3pt2-1.start{counter-reset:lst-ctn-kix_6ube3zqa3pt2-1 0}ol.lst-kix_gcnk1726ag0y-7.start{counter-reset:lst-ctn-kix_gcnk1726ag0y-7 0}ol.lst-kix_6xlv5a4aatsk-1.start{counter-reset:lst-ctn-kix_6xlv5a4aatsk-1 0}.lst-kix_6ube3zqa3pt2-0>li:before{content:"" counter(lst-ctn-kix_6ube3zqa3pt2-0,decimal) ". "}.lst-kix_bwulzs2i1l18-2>li:before{content:"" counter(lst-ctn-kix_bwulzs2i1l18-2,lower-roman) ". "}.lst-kix_bwulzs2i1l18-3>li:before{content:"" counter(lst-ctn-kix_bwulzs2i1l18-3,decimal) ". "}.lst-kix_jryf0al0udev-8>li{counter-increment:lst-ctn-kix_jryf0al0udev-8}.lst-kix_6ube3zqa3pt2-3>li:before{content:"" counter(lst-ctn-kix_6ube3zqa3pt2-3,decimal) ". "}.lst-kix_6ube3zqa3pt2-2>li:before{content:"" counter(lst-ctn-kix_6ube3zqa3pt2-2,lower-roman) ". "}.lst-kix_6ube3zqa3pt2-4>li:before{content:"" counter(lst-ctn-kix_6ube3zqa3pt2-4,lower-latin) ". "}.lst-kix_6ube3zqa3pt2-1>li:before{content:"" counter(lst-ctn-kix_6ube3zqa3pt2-1,decimal) ". "}.lst-kix_6ube3zqa3pt2-5>li:before{content:"" counter(lst-ctn-kix_6ube3zqa3pt2-5,lower-roman) ". "}ol.lst-kix_n291az369z9f-0{list-style-type:none}.lst-kix_bwulzs2i1l18-1>li:before{content:"" counter(lst-ctn-kix_bwulzs2i1l18-1,lower-latin) ". "}.lst-kix_bwulzs2i1l18-0>li:before{content:"" counter(lst-ctn-kix_bwulzs2i1l18-0,decimal) ". "}.lst-kix_jryf0al0udev-5>li:before{content:"" counter(lst-ctn-kix_jryf0al0udev-5,lower-roman) ". "}.lst-kix_jryf0al0udev-3>li:before{content:"" counter(lst-ctn-kix_jryf0al0udev-3,decimal) ". "}.lst-kix_jryf0al0udev-4>li:before{content:"" counter(lst-ctn-kix_jryf0al0udev-4,lower-latin) ". "}.lst-kix_jryf0al0udev-2>li:before{content:"" counter(lst-ctn-kix_jryf0al0udev-2,lower-roman) ". "}.lst-kix_6ube3zqa3pt2-7>li:before{content:"" counter(lst-ctn-kix_6ube3zqa3pt2-7,lower-latin) ". "}ol.lst-kix_n291az369z9f-3{list-style-type:none}.lst-kix_jryf0al0udev-0>li:before{content:"" counter(lst-ctn-kix_jryf0al0udev-0,decimal) ". "}ol.lst-kix_n291az369z9f-4{list-style-type:none}.lst-kix_6ube3zqa3pt2-6>li:before{content:"" counter(lst-ctn-kix_6ube3zqa3pt2-6,decimal) ". "}.lst-kix_6ube3zqa3pt2-8>li:before{content:"" counter(lst-ctn-kix_6ube3zqa3pt2-8,lower-roman) ". "}ol.lst-kix_n291az369z9f-1{list-style-type:none}ol.lst-kix_n291az369z9f-2{list-style-type:none}.lst-kix_gcnk1726ag0y-0>li{counter-increment:lst-ctn-kix_gcnk1726ag0y-0}ol.lst-kix_n291az369z9f-7{list-style-type:none}.lst-kix_n291az369z9f-8>li:before{content:"" counter(lst-ctn-kix_n291az369z9f-8,lower-roman) ". "}.lst-kix_1if9dzlexiok-4>li{counter-increment:lst-ctn-kix_1if9dzlexiok-4}.lst-kix_jryf0al0udev-1>li:before{content:"" counter(lst-ctn-kix_jryf0al0udev-1,lower-latin) ". "}ol.lst-kix_n291az369z9f-8{list-style-type:none}ol.lst-kix_n291az369z9f-5{list-style-type:none}ol.lst-kix_n291az369z9f-6{list-style-type:none}.lst-kix_n291az369z9f-6>li:before{content:"" counter(lst-ctn-kix_n291az369z9f-6,decimal) ". "}.lst-kix_9z7ttbbevln3-6>li{counter-increment:lst-ctn-kix_9z7ttbbevln3-6}ol.lst-kix_4wleabl6qpn9-0.start{counter-reset:lst-ctn-kix_4wleabl6qpn9-0 0}.lst-kix_n291az369z9f-5>li:before{content:"" counter(lst-ctn-kix_n291az369z9f-5,lower-roman) ". "}.lst-kix_n291az369z9f-7>li:before{content:"" counter(lst-ctn-kix_n291az369z9f-7,lower-latin) ". "}ol.lst-kix_6ube3zqa3pt2-6.start{counter-reset:lst-ctn-kix_6ube3zqa3pt2-6 0}ol.lst-kix_1if9dzlexiok-5.start{counter-reset:lst-ctn-kix_1if9dzlexiok-5 0}.lst-kix_n291az369z9f-2>li:before{content:"" counter(lst-ctn-kix_n291az369z9f-2,lower-roman) ". "}.lst-kix_n291az369z9f-3>li:before{content:"" counter(lst-ctn-kix_n291az369z9f-3,decimal) ". "}.lst-kix_n291az369z9f-4>li:before{content:"" counter(lst-ctn-kix_n291az369z9f-4,lower-latin) ". "}.lst-kix_v1ruob1mbwh3-5>li{counter-increment:lst-ctn-kix_v1ruob1mbwh3-5}.lst-kix_1if9dzlexiok-0>li{counter-increment:lst-ctn-kix_1if9dzlexiok-0}.lst-kix_6ube3zqa3pt2-3>li{counter-increment:lst-ctn-kix_6ube3zqa3pt2-3}ol.lst-kix_n291az369z9f-4.start{counter-reset:lst-ctn-kix_n291az369z9f-4 0}.lst-kix_jvq872n28gbj-1>li{counter-increment:lst-ctn-kix_jvq872n28gbj-1}.lst-kix_jvq872n28gbj-4>li{counter-increment:lst-ctn-kix_jvq872n28gbj-4}ol.lst-kix_bwulzs2i1l18-3.start{counter-reset:lst-ctn-kix_bwulzs2i1l18-3 0}ol.lst-kix_6xlv5a4aatsk-8.start{counter-reset:lst-ctn-kix_6xlv5a4aatsk-8 0}ol.lst-kix_4wleabl6qpn9-7.start{counter-reset:lst-ctn-kix_4wleabl6qpn9-7 0}ol.lst-kix_9z7ttbbevln3-7.start{counter-reset:lst-ctn-kix_9z7ttbbevln3-7 0}.lst-kix_6xlv5a4aatsk-8>li{counter-increment:lst-ctn-kix_6xlv5a4aatsk-8}.lst-kix_jryf0al0udev-4>li{counter-increment:lst-ctn-kix_jryf0al0udev-4}ol.lst-kix_6xlv5a4aatsk-0{list-style-type:none}.lst-kix_9z7ttbbevln3-4>li:before{content:"" counter(lst-ctn-kix_9z7ttbbevln3-4,lower-latin) ". "}ol.lst-kix_6xlv5a4aatsk-1{list-style-type:none}ol.lst-kix_6xlv5a4aatsk-2{list-style-type:none}ol.lst-kix_6xlv5a4aatsk-3{list-style-type:none}ol.lst-kix_6xlv5a4aatsk-4{list-style-type:none}.lst-kix_9z7ttbbevln3-2>li:before{content:"" counter(lst-ctn-kix_9z7ttbbevln3-2,lower-roman) ". "}.lst-kix_9z7ttbbevln3-6>li:before{content:"" counter(lst-ctn-kix_9z7ttbbevln3-6,decimal) ". "}ol.lst-kix_6xlv5a4aatsk-5{list-style-type:none}ol.lst-kix_6xlv5a4aatsk-6{list-style-type:none}.lst-kix_6xlv5a4aatsk-4>li{counter-increment:lst-ctn-kix_6xlv5a4aatsk-4}.lst-kix_9z7ttbbevln3-0>li:before{content:"" counter(lst-ctn-kix_9z7ttbbevln3-0,decimal) ". "}.lst-kix_9z7ttbbevln3-8>li:before{content:"" counter(lst-ctn-kix_9z7ttbbevln3-8,lower-roman) ". "}.lst-kix_6xlv5a4aatsk-0>li:before{content:"" counter(lst-ctn-kix_6xlv5a4aatsk-0,decimal) ". "}.lst-kix_gcnk1726ag0y-8>li{counter-increment:lst-ctn-kix_gcnk1726ag0y-8}.lst-kix_6xlv5a4aatsk-2>li:before{content:"" counter(lst-ctn-kix_6xlv5a4aatsk-2,lower-roman) ". "}.lst-kix_9z7ttbbevln3-3>li{counter-increment:lst-ctn-kix_9z7ttbbevln3-3}ol.lst-kix_1if9dzlexiok-3.start{counter-reset:lst-ctn-kix_1if9dzlexiok-3 0}.lst-kix_6xlv5a4aatsk-6>li:before{content:"" counter(lst-ctn-kix_6xlv5a4aatsk-6,decimal) ". "}ol.lst-kix_6xlv5a4aatsk-7{list-style-type:none}ol.lst-kix_6xlv5a4aatsk-8{list-style-type:none}.lst-kix_6ube3zqa3pt2-0>li{counter-increment:lst-ctn-kix_6ube3zqa3pt2-0}ol.lst-kix_1if9dzlexiok-0.start{counter-reset:lst-ctn-kix_1if9dzlexiok-0 0}.lst-kix_6xlv5a4aatsk-4>li:before{content:"" counter(lst-ctn-kix_6xlv5a4aatsk-4,lower-latin) ". "}ol.lst-kix_jryf0al0udev-6.start{counter-reset:lst-ctn-kix_jryf0al0udev-6 0}.lst-kix_4wleabl6qpn9-2>li{counter-increment:lst-ctn-kix_4wleabl6qpn9-2}ol.lst-kix_4wleabl6qpn9-5.start{counter-reset:lst-ctn-kix_4wleabl6qpn9-5 0}ol.lst-kix_6xlv5a4aatsk-3.start{counter-reset:lst-ctn-kix_6xlv5a4aatsk-3 0}.lst-kix_6xlv5a4aatsk-8>li:before{content:"" counter(lst-ctn-kix_6xlv5a4aatsk-8,lower-roman) ". "}.lst-kix_n291az369z9f-0>li:before{content:"" counter(lst-ctn-kix_n291az369z9f-0,decimal) ". "}.lst-kix_9lbtd2o11732-6>li{counter-increment:lst-ctn-kix_9lbtd2o11732-6}ol.lst-kix_9lbtd2o11732-3.start{counter-reset:lst-ctn-kix_9lbtd2o11732-3 0}ol.lst-kix_4wleabl6qpn9-2.start{counter-reset:lst-ctn-kix_4wleabl6qpn9-2 0}.lst-kix_10h1fv8hz3aq-1>li{counter-increment:lst-ctn-kix_10h1fv8hz3aq-1}.lst-kix_jvq872n28gbj-8>li:before{content:"" counter(lst-ctn-kix_jvq872n28gbj-8,lower-roman) ". "}.lst-kix_jvq872n28gbj-6>li:before{content:"" counter(lst-ctn-kix_jvq872n28gbj-6,decimal) ". "}.lst-kix_jryf0al0udev-7>li:before{content:"" counter(lst-ctn-kix_jryf0al0udev-7,lower-latin) ". "}.lst-kix_jvq872n28gbj-5>li{counter-increment:lst-ctn-kix_jvq872n28gbj-5}.lst-kix_jvq872n28gbj-4>li:before{content:"" counter(lst-ctn-kix_jvq872n28gbj-4,lower-latin) ". "}ol.lst-kix_v1ruob1mbwh3-8.start{counter-reset:lst-ctn-kix_v1ruob1mbwh3-8 0}.lst-kix_bwulzs2i1l18-4>li:before{content:"" counter(lst-ctn-kix_bwulzs2i1l18-4,lower-latin) ". "}ol.lst-kix_jryf0al0udev-8.start{counter-reset:lst-ctn-kix_jryf0al0udev-8 0}ol.lst-kix_bwulzs2i1l18-1.start{counter-reset:lst-ctn-kix_bwulzs2i1l18-1 0}.lst-kix_jvq872n28gbj-2>li:before{content:"" counter(lst-ctn-kix_jvq872n28gbj-2,lower-roman) ". "}.lst-kix_bwulzs2i1l18-8>li:before{content:"" counter(lst-ctn-kix_bwulzs2i1l18-8,lower-roman) ". "}.lst-kix_bwulzs2i1l18-6>li:before{content:"" counter(lst-ctn-kix_bwulzs2i1l18-6,decimal) ". "}ol.lst-kix_6xlv5a4aatsk-6.start{counter-reset:lst-ctn-kix_6xlv5a4aatsk-6 0}.lst-kix_jvq872n28gbj-0>li:before{content:"" counter(lst-ctn-kix_jvq872n28gbj-0,decimal) ". "}ol.lst-kix_n291az369z9f-7.start{counter-reset:lst-ctn-kix_n291az369z9f-7 0}.lst-kix_gcnk1726ag0y-1>li{counter-increment:lst-ctn-kix_gcnk1726ag0y-1}ol.lst-kix_6ube3zqa3pt2-8.start{counter-reset:lst-ctn-kix_6ube3zqa3pt2-8 0}.lst-kix_10h1fv8hz3aq-2>li{counter-increment:lst-ctn-kix_10h1fv8hz3aq-2}.lst-kix_10h1fv8hz3aq-8>li{counter-increment:lst-ctn-kix_10h1fv8hz3aq-8}.lst-kix_9lbtd2o11732-5>li{counter-increment:lst-ctn-kix_9lbtd2o11732-5}.lst-kix_6ube3zqa3pt2-7>li{counter-increment:lst-ctn-kix_6ube3zqa3pt2-7}ol.lst-kix_9lbtd2o11732-5.start{counter-reset:lst-ctn-kix_9lbtd2o11732-5 0}ol.lst-kix_9z7ttbbevln3-8{list-style-type:none}ol.lst-kix_9z7ttbbevln3-7{list-style-type:none}ol.lst-kix_9z7ttbbevln3-6{list-style-type:none}ol.lst-kix_9z7ttbbevln3-5{list-style-type:none}ol.lst-kix_9z7ttbbevln3-4{list-style-type:none}ol.lst-kix_9z7ttbbevln3-3{list-style-type:none}ol.lst-kix_9z7ttbbevln3-2{list-style-type:none}ol.lst-kix_bwulzs2i1l18-0.start{counter-reset:lst-ctn-kix_bwulzs2i1l18-0 0}ol.lst-kix_9z7ttbbevln3-1{list-style-type:none}ol.lst-kix_9z7ttbbevln3-0{list-style-type:none}ol.lst-kix_10h1fv8hz3aq-0.start{counter-reset:lst-ctn-kix_10h1fv8hz3aq-0 0}.lst-kix_gcnk1726ag0y-7>li{counter-increment:lst-ctn-kix_gcnk1726ag0y-7}ol.lst-kix_10h1fv8hz3aq-5.start{counter-reset:lst-ctn-kix_10h1fv8hz3aq-5 0}.lst-kix_6ube3zqa3pt2-6>li{counter-increment:lst-ctn-kix_6ube3zqa3pt2-6}ol.lst-kix_gcnk1726ag0y-0{list-style-type:none}ol.lst-kix_gcnk1726ag0y-1{list-style-type:none}ol.lst-kix_9lbtd2o11732-7.start{counter-reset:lst-ctn-kix_9lbtd2o11732-7 0}ol.lst-kix_gcnk1726ag0y-2{list-style-type:none}ol.lst-kix_gcnk1726ag0y-3{list-style-type:none}ol.lst-kix_gcnk1726ag0y-4{list-style-type:none}ol.lst-kix_6ube3zqa3pt2-4.start{counter-reset:lst-ctn-kix_6ube3zqa3pt2-4 0}.lst-kix_gcnk1726ag0y-3>li{counter-increment:lst-ctn-kix_gcnk1726ag0y-3}ol.lst-kix_9z7ttbbevln3-3.start{counter-reset:lst-ctn-kix_9z7ttbbevln3-3 0}.lst-kix_9lbtd2o11732-5>li:before{content:"" counter(lst-ctn-kix_9lbtd2o11732-5,lower-roman) ". "}ol.lst-kix_v1ruob1mbwh3-0{list-style-type:none}ol.lst-kix_v1ruob1mbwh3-1{list-style-type:none}ol.lst-kix_v1ruob1mbwh3-4{list-style-type:none}.lst-kix_9lbtd2o11732-2>li:before{content:"" counter(lst-ctn-kix_9lbtd2o11732-2,lower-roman) ". "}ol.lst-kix_gcnk1726ag0y-5{list-style-type:none}ol.lst-kix_v1ruob1mbwh3-5{list-style-type:none}ol.lst-kix_gcnk1726ag0y-6{list-style-type:none}ol.lst-kix_v1ruob1mbwh3-2{list-style-type:none}.lst-kix_9lbtd2o11732-1>li:before{content:"" counter(lst-ctn-kix_9lbtd2o11732-1,lower-latin) ". "}ol.lst-kix_gcnk1726ag0y-7{list-style-type:none}ol.lst-kix_v1ruob1mbwh3-3{list-style-type:none}ol.lst-kix_gcnk1726ag0y-8{list-style-type:none}ol.lst-kix_v1ruob1mbwh3-8{list-style-type:none}.lst-kix_v1ruob1mbwh3-8>li{counter-increment:lst-ctn-kix_v1ruob1mbwh3-8}.lst-kix_bwulzs2i1l18-6>li{counter-increment:lst-ctn-kix_bwulzs2i1l18-6}ol.lst-kix_4wleabl6qpn9-3.start{counter-reset:lst-ctn-kix_4wleabl6qpn9-3 0}ol.lst-kix_v1ruob1mbwh3-6{list-style-type:none}ol.lst-kix_v1ruob1mbwh3-7{list-style-type:none}.lst-kix_1if9dzlexiok-3>li{counter-increment:lst-ctn-kix_1if9dzlexiok-3}ol.lst-kix_1if9dzlexiok-1.start{counter-reset:lst-ctn-kix_1if9dzlexiok-1 0}.lst-kix_4wleabl6qpn9-8>li{counter-increment:lst-ctn-kix_4wleabl6qpn9-8}.lst-kix_10h1fv8hz3aq-0>li:before{content:"" counter(lst-ctn-kix_10h1fv8hz3aq-0,decimal) ". "}.lst-kix_10h1fv8hz3aq-1>li:before{content:"" counter(lst-ctn-kix_10h1fv8hz3aq-1,decimal) ". "}ol.lst-kix_v1ruob1mbwh3-3.start{counter-reset:lst-ctn-kix_v1ruob1mbwh3-3 0}ol.lst-kix_gcnk1726ag0y-4.start{counter-reset:lst-ctn-kix_gcnk1726ag0y-4 0}.lst-kix_10h1fv8hz3aq-4>li:before{content:"" counter(lst-ctn-kix_10h1fv8hz3aq-4,lower-latin) ". "}.lst-kix_9lbtd2o11732-6>li:before{content:"" counter(lst-ctn-kix_9lbtd2o11732-6,decimal) ". "}.lst-kix_1if9dzlexiok-1>li{counter-increment:lst-ctn-kix_1if9dzlexiok-1}.lst-kix_10h1fv8hz3aq-5>li:before{content:"" counter(lst-ctn-kix_10h1fv8hz3aq-5,lower-roman) ". "}.lst-kix_bwulzs2i1l18-8>li{counter-increment:lst-ctn-kix_bwulzs2i1l18-8}.lst-kix_1if9dzlexiok-0>li:before{content:"" counter(lst-ctn-kix_1if9dzlexiok-0,decimal) ". "}.lst-kix_1if9dzlexiok-4>li:before{content:"" counter(lst-ctn-kix_1if9dzlexiok-4,lower-latin) ". "}ol.lst-kix_v1ruob1mbwh3-4.start{counter-reset:lst-ctn-kix_v1ruob1mbwh3-4 0}.lst-kix_v1ruob1mbwh3-6>li{counter-increment:lst-ctn-kix_v1ruob1mbwh3-6}.lst-kix_1if9dzlexiok-1>li:before{content:"" counter(lst-ctn-kix_1if9dzlexiok-1,decimal) ". "}.lst-kix_9z7ttbbevln3-0>li{counter-increment:lst-ctn-kix_9z7ttbbevln3-0}ol.lst-kix_9z7ttbbevln3-8.start{counter-reset:lst-ctn-kix_9z7ttbbevln3-8 0}ol.lst-kix_gcnk1726ag0y-5.start{counter-reset:lst-ctn-kix_gcnk1726ag0y-5 0}.lst-kix_gcnk1726ag0y-5>li{counter-increment:lst-ctn-kix_gcnk1726ag0y-5}.lst-kix_9lbtd2o11732-1>li{counter-increment:lst-ctn-kix_9lbtd2o11732-1}ol.lst-kix_10h1fv8hz3aq-4.start{counter-reset:lst-ctn-kix_10h1fv8hz3aq-4 0}.lst-kix_6xlv5a4aatsk-2>li{counter-increment:lst-ctn-kix_6xlv5a4aatsk-2}.lst-kix_6xlv5a4aatsk-5>li{counter-increment:lst-ctn-kix_6xlv5a4aatsk-5}ol.lst-kix_6ube3zqa3pt2-5.start{counter-reset:lst-ctn-kix_6ube3zqa3pt2-5 0}ol.lst-kix_gcnk1726ag0y-0.start{counter-reset:lst-ctn-kix_gcnk1726ag0y-0 0}.lst-kix_4wleabl6qpn9-1>li{counter-increment:lst-ctn-kix_4wleabl6qpn9-1}.lst-kix_4wleabl6qpn9-4>li{counter-increment:lst-ctn-kix_4wleabl6qpn9-4}.lst-kix_jryf0al0udev-1>li{counter-increment:lst-ctn-kix_jryf0al0udev-1}.lst-kix_n291az369z9f-5>li{counter-increment:lst-ctn-kix_n291az369z9f-5}ol.lst-kix_9lbtd2o11732-8.start{counter-reset:lst-ctn-kix_9lbtd2o11732-8 0}.lst-kix_9z7ttbbevln3-3>li:before{content:"" counter(lst-ctn-kix_9z7ttbbevln3-3,decimal) ". "}ol.lst-kix_gcnk1726ag0y-3.start{counter-reset:lst-ctn-kix_gcnk1726ag0y-3 0}.lst-kix_9z7ttbbevln3-7>li:before{content:"" counter(lst-ctn-kix_9z7ttbbevln3-7,lower-latin) ". "}.lst-kix_10h1fv8hz3aq-0>li{counter-increment:lst-ctn-kix_10h1fv8hz3aq-0}.lst-kix_6xlv5a4aatsk-1>li:before{content:"" counter(lst-ctn-kix_6xlv5a4aatsk-1,lower-latin) ". "}ol.lst-kix_v1ruob1mbwh3-2.start{counter-reset:lst-ctn-kix_v1ruob1mbwh3-2 0}ol.lst-kix_bwulzs2i1l18-0{list-style-type:none}.lst-kix_n291az369z9f-7>li{counter-increment:lst-ctn-kix_n291az369z9f-7}ol.lst-kix_bwulzs2i1l18-8{list-style-type:none}ol.lst-kix_bwulzs2i1l18-7{list-style-type:none}ol.lst-kix_bwulzs2i1l18-6{list-style-type:none}ol.lst-kix_bwulzs2i1l18-5{list-style-type:none}ol.lst-kix_bwulzs2i1l18-4{list-style-type:none}ol.lst-kix_bwulzs2i1l18-3{list-style-type:none}.lst-kix_6xlv5a4aatsk-5>li:before{content:"" counter(lst-ctn-kix_6xlv5a4aatsk-5,lower-roman) ". "}ol.lst-kix_bwulzs2i1l18-2{list-style-type:none}ol.lst-kix_bwulzs2i1l18-1{list-style-type:none}ol.lst-kix_6ube3zqa3pt2-3.start{counter-reset:lst-ctn-kix_6ube3zqa3pt2-3 0}.lst-kix_v1ruob1mbwh3-0>li:before{content:"" counter(lst-ctn-kix_v1ruob1mbwh3-0,decimal) ". "}.lst-kix_9z7ttbbevln3-2>li{counter-increment:lst-ctn-kix_9z7ttbbevln3-2}.lst-kix_n291az369z9f-1>li:before{content:"" counter(lst-ctn-kix_n291az369z9f-1,lower-latin) ". "}ol.lst-kix_6ube3zqa3pt2-0.start{counter-reset:lst-ctn-kix_6ube3zqa3pt2-0 0}.lst-kix_9lbtd2o11732-3>li{counter-increment:lst-ctn-kix_9lbtd2o11732-3}.lst-kix_1if9dzlexiok-8>li:before{content:"" counter(lst-ctn-kix_1if9dzlexiok-8,lower-roman) ". "}.lst-kix_jvq872n28gbj-3>li{counter-increment:lst-ctn-kix_jvq872n28gbj-3}ol.lst-kix_9z7ttbbevln3-2.start{counter-reset:lst-ctn-kix_9z7ttbbevln3-2 0}.lst-kix_9z7ttbbevln3-7>li{counter-increment:lst-ctn-kix_9z7ttbbevln3-7}.lst-kix_10h1fv8hz3aq-8>li:before{content:"" counter(lst-ctn-kix_10h1fv8hz3aq-8,lower-roman) ". "}.lst-kix_6xlv5a4aatsk-7>li{counter-increment:lst-ctn-kix_6xlv5a4aatsk-7}.lst-kix_jryf0al0udev-8>li:before{content:"" counter(lst-ctn-kix_jryf0al0udev-8,lower-roman) ". "}ol.lst-kix_9z7ttbbevln3-5.start{counter-reset:lst-ctn-kix_9z7ttbbevln3-5 0}.lst-kix_jvq872n28gbj-5>li:before{content:"" counter(lst-ctn-kix_jvq872n28gbj-5,lower-roman) ". "}ol.lst-kix_10h1fv8hz3aq-7.start{counter-reset:lst-ctn-kix_10h1fv8hz3aq-7 0}.lst-kix_6xlv5a4aatsk-0>li{counter-increment:lst-ctn-kix_6xlv5a4aatsk-0}.lst-kix_jvq872n28gbj-1>li:before{content:"" counter(lst-ctn-kix_jvq872n28gbj-1,lower-latin) ". "}.lst-kix_4wleabl6qpn9-6>li{counter-increment:lst-ctn-kix_4wleabl6qpn9-6}ol.lst-kix_v1ruob1mbwh3-0.start{counter-reset:lst-ctn-kix_v1ruob1mbwh3-0 0}.lst-kix_n291az369z9f-0>li{counter-increment:lst-ctn-kix_n291az369z9f-0}ol.lst-kix_gcnk1726ag0y-2.start{counter-reset:lst-ctn-kix_gcnk1726ag0y-2 0}.lst-kix_bwulzs2i1l18-7>li:before{content:"" counter(lst-ctn-kix_bwulzs2i1l18-7,lower-latin) ". "}.lst-kix_9lbtd2o11732-8>li{counter-increment:lst-ctn-kix_9lbtd2o11732-8}ol.lst-kix_9z7ttbbevln3-4.start{counter-reset:lst-ctn-kix_9z7ttbbevln3-4 0}ol.lst-kix_10h1fv8hz3aq-6.start{counter-reset:lst-ctn-kix_10h1fv8hz3aq-6 0}.lst-kix_v1ruob1mbwh3-1>li{counter-increment:lst-ctn-kix_v1ruob1mbwh3-1}.lst-kix_gcnk1726ag0y-6>li:before{content:"" counter(lst-ctn-kix_gcnk1726ag0y-6,decimal) ". "}li.li-bullet-0:before{margin-left:-18pt;white-space:nowrap;display:inline-block;min-width:18pt}.lst-kix_10h1fv8hz3aq-5>li{counter-increment:lst-ctn-kix_10h1fv8hz3aq-5}.lst-kix_6ube3zqa3pt2-4>li{counter-increment:lst-ctn-kix_6ube3zqa3pt2-4}ol.lst-kix_6ube3zqa3pt2-2.start{counter-reset:lst-ctn-kix_6ube3zqa3pt2-2 0}.lst-kix_bwulzs2i1l18-1>li{counter-increment:lst-ctn-kix_bwulzs2i1l18-1}.lst-kix_1if9dzlexiok-8>li{counter-increment:lst-ctn-kix_1if9dzlexiok-8}ol.lst-kix_v1ruob1mbwh3-1.start{counter-reset:lst-ctn-kix_v1ruob1mbwh3-1 0}ol{margin:0;padding:0}table td,table th{padding:0}.c3{margin-left:36pt;padding-top:0pt;padding-left:0pt;padding-bottom:12pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c6{margin-left:72pt;padding-top:0pt;padding-left:0pt;padding-bottom:12pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c8{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c2{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c10{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:12pt;font-family:"Arial";font-style:normal}.c0{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c1{padding-top:12pt;padding-bottom:12pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c12{font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c16{padding-top:0pt;padding-bottom:12pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c13{font-weight:700;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c15{font-weight:400;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c11{text-decoration-skip-ink:none;-webkit-text-decoration-skip:none;color:#1155cc;text-decoration:underline}.c5{background-color:#ffffff;max-width:451.4pt;padding:72pt 72pt 72pt 72pt}.c4{padding:0;margin:0}.c7{color:inherit;text-decoration:inherit}.c14{height:11pt}.c9{color:#ff0000}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}'
        }}
      />
      {isEnglish ?
        <>
          <p className="c1">
            <span className="c10">Terms of Use</span>
          </p>
          <p className="c1">
            <span className="c2">Article 1 (Purpose)</span>
          </p>
          <p className="c1">
            <span className="c0">
              These terms and conditions are intended to define the rights, obligations, and responsibilities of "Company" and "Advertiser" in providing advertising services (defined below) provided by ㈜ Icarus (hereinafter referred to as the "Company") to "Advertisers" (defined below).
            </span>
          </p>
          <p className="c1">
            <span className="c2">Article 2 (Definitions)</span>
          </p>
          <p className="c1">
            <span className="c0">
              The definitions of terms used in these terms and conditions are as follows:
            </span>
          </p>
          <ol className="c4 lst-kix_bwulzs2i1l18-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① "Advertisement" (hereinafter referred to as "Advertisement") refers to the exposure of "Advertiser's" "Advertisement Material" (defined below) on "Advertisement Media" according to the content and procedure of the advertisement product (defined below) applied for by the "Advertiser."
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "Advertisement Material" refers to the material produced by the "Advertiser" and registered on the advertising media, such as product descriptions, product photos, text, or images.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span>
                ③ "Advertisement Product" refers to the product sold by the "Company" to the "Advertiser" to post the "Advertiser's" "Advertisement Material" on the "Advertisement Media." The specific contents of the advertisement product, exposure format, location, etc., are as defined in the advertisement product and advertisement service usage fee standards (
              </span>
              <span className="c11">
                <a
                  className="c7"
                  href="https://www.google.com/url?q=https://marketinghub.esmplus.com/ad-guide/index.html&sa=D&source=editors&ust=1705559670310376&usg=AOvVaw3WwAYK3RoTe2WqHN0SQdqs"
                >
                  Attachment 1.
                </a>
              </span>
              <span className="c0">&nbsp;).</span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ "Advertisement Service" refers to the service that exposes the "Advertiser's" "Advertisement Material" on the "Advertisement Media" according to the content of the purchased advertisement product, and provides various services such as advertisement registration, advertisement management, and reports.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ "Advertiser" refers to a person who applies for and uses the service according to the procedures prescribed in these terms and conditions.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span>
                ⑥ "Icarus Advertising Center" refers to the service page (
              </span>
              <span className="c9">Homepage URL</span>
              <span className="c0">) provided by the "Company" to the "Advertiser" for advertisement application, posting, management, and cancellation.</span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑦ "Service Usage Fee" refers to the amount paid by the "Advertiser" to the "Company" as a consideration for using the service.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑧ "External Platform Advertisement" refers to the "Advertisement Service" provided by the "Company" through designated internet and mobile advertising platforms to provide "Advertisement Media."
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑬ "Advertisement Money" refers to the electronic payment method issued by the "Company" to the "Advertiser" for promotional benefits, compensation, and refunds. "Advertisement Money" is valid for three months from the date of issue unless otherwise specified, and can only be used when paying for "Advertisement Products."
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">Article 3 (Publication and Composition of Terms and Conditions)</span>
          </p>
          <ol className="c4 lst-kix_9lbtd2o11732-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span>
                ① The "Company" shall post the contents of these terms and conditions on the "Icarus (
              </span>
              <span className="c9">Homepage URL</span>
              <span className="c0">)" to make it easily accessible to the "Advertiser."</span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② In case the "Company" revises these terms and conditions, it shall notify the "Advertiser" of the application date and reason for the revision along with the current terms and conditions, in the manner prescribed in paragraph 1, at least seven (7) days before the application date up to the day before the application date. However, in the case of changing the terms and conditions to the disadvantage of the "Advertiser," the "Company" shall give a prior notice period of at least thirty (30) days.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ If the "Company" notifies or notifies the "Advertiser" of the revised terms and conditions according to the preceding paragraph, and the "Advertiser" does not express its intention within the period specified in the preceding paragraph, it shall be deemed that the "Advertiser" has agreed to the revised terms and conditions, even if the "Advertiser" does not explicitly express its refusal.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">Article 4 (Formation of Service Agreement)</span>
          </p>
          <ol className="c4 lst-kix_10h1fv8hz3aq-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① The service agreement is formed when the "Advertiser" agrees to the following "Terms and Conditions," applies for use according to the procedure set by the "Company," and the "Company" approves such application.
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_10h1fv8hz3aq-1 start" start={1}>
            <li className="c6 li-bullet-0">
              <span className="c0">1) Agreement to the "Basic Terms"</span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">2) Agreement to these "Terms and Conditions"</span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">2) Confirmation of "Advertiser" registration completion</span>
            </li>
          </ol>
          <ol className="c4 lst-kix_10h1fv8hz3aq-0" start={2}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② The "Company" may restrict the use of advertising services by the "Advertiser" if the "Advertiser" has any of the following reasons:
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_10h1fv8hz3aq-1 start" start={1}>
            <li className="c6 li-bullet-0">
              <span className="c0">
                1) Providing false information or failing to provide the information requested by the "Company"
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                2) Losing the qualification as an "Advertiser" due to violations of the basic terms, etc.
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                3) Other cases where the "Company" reasonably determines that it is necessary to restrict the use of advertising services
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">Article 5 (Registration, Restriction, and Management of Advertisements)</span>
          </p>
          <ol className="c4 lst-kix_gcnk1726ag0y-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span>
                ① The "Company" shall announce the types of advertisement products, advertisement areas, registration procedures, billing methods, etc., in the advertisement product and advertisement service fee charging standards (
              </span>
              <span className="c11">
                <a
                  className="c7"
                  href="https://www.google.com/url?q=https://marketinghub.esmplus.com/ad-guide/index.html&sa=D&source=editors&ust=1705559670311450&usg=AOvVaw2xqChz_zRfa0AskcI0gHis"
                >
                  Attachment 1.
                </a>
              </span>
              <span className="c0">
                &nbsp;) and "Icarus Advertising Center," and the "Advertiser" must carefully review them before applying for advertisement.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② The "Company" only inspects whether the "Advertiser's" applied "Advertisement" and "Advertisement Material" comply with the procedures, criteria, and methods set by the "Company," and does not conduct a substantive examination of the validity of rights, scope, and subjects of rights, relevant contracts, etc., between the "Advertisement" and "Advertisement Material." The "Company" assumes no responsibility for the cancellation, deletion, or temporary suspension of the "Advertisement" or "Advertisement Material" due to reports or requests from claimants, and this must be resolved between the claimant and the "Advertiser." The "Company" publishes the advertisement approved by the "Company" on the "Advertisement Media" using the "Advertiser's" "Advertisement Material."
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ Before posting advertisements, the "Advertiser" must deposit a sales deposit. If the "Advertiser" does not sufficiently deposit the sales deposit in advance, the posting of advertisements may be suspended, and the "Advertiser" shall be responsible for any resulting issues.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ The "Company" may restrict or suspend the posting of advertisements if the "Advertisement" and "Advertisement Material" of the "Advertiser" fall under any of the following subparagraphs, and the Company assumes no responsibility for the suspension of advertisements:
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_gcnk1726ag0y-1 start" start={1}>
            <li className="c6 li-bullet-0">
              <span className="c0">
                1) Acts of accessing the "Advertisement Service" in a manner not provided by the "Company"
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                2) Acts of arbitrarily or unfairly changing (generating, decreasing, increasing) click counts, impression counts, etc.
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                3) Acts that may or may cause legal or property risks to the "Company"
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                4) Acts causing system overload of the "Company's" advertising media, servers, and equipment
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                5) Acts violating the "Company's" advertising operation guide (Attachment 2)
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                6) Other acts that interfere with the normal operation of the "Advertisement Service"
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_gcnk1726ag0y-0" start={5}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ The "Advertiser" may purchase, add, delete, post, or suspend advertisements at any time by accessing "Icarus" according to the procedures and methods set by the "Company."
              </span>
            </li>
          </ol>
          <p className="c16 c14">
            <span className="c0" />
          </p>
          <p className="c14 c16">
            <span className="c0" />
          </p>
          <p className="c1">
            <span className="c2">Article 6 (Changes and Discontinuation of Advertising Services)</span>
          </p>
          <ol className="c4 lst-kix_6ube3zqa3pt2-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① The "Company" has the authority to determine and change or add the scope of advertisement media, the posting area in the advertisement media, posting order, posting information, UI, etc. (hereinafter referred to as "advertisement area, etc.").
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② If there are any changes in the content of the "advertisement area, etc.," the "Company" will announce it on the bulletin board within "Icarus" before the change. If the "Advertiser" does not agree with the changes in the advertisement service, they may suspend the exposure of the advertisement within "Icarus" at any time.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ The "Company" may conduct tests targeting some keywords and traffic without separate notice for the purpose of improving the quality of the advertising service and increasing the effectiveness of the advertisement. However, if the test falls under any of the following subparagraphs, the details of the test will be announced separately through the bulletin board of Icarus at least 7 days in advance.
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_6ube3zqa3pt2-1 start" start={1}>
            <li className="c6 li-bullet-0">
              <span className="c0">
                1) If the exposure ranking of posted advertisements changes for some reason despite the bidding results
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                2) If some advertisements are not exposed despite the bidding results
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">3) If the UI of posted advertisements changes in some parts</span>
            </li>
          </ol>
          <ol className="c4 lst-kix_6ube3zqa3pt2-0" start={4}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ In case of reasons such as maintenance check and replacement of information and communication equipment, communication, and system failures, the "Company" may temporarily suspend the provision of services. In the event of a service interruption, the "Company" shall immediately notify the "Advertiser" of the suspension through the Icarus Advertising Center main page, notice board, or by electronic mail, telephone, etc. However, in the case of service interruption due to unforeseeable circumstances by the "Company," this shall be an exception.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">Article 7 (Settlement of Advertising Service Usage Fees)</span>
          </p>
          <ol className="c4 lst-kix_9z7ttbbevln3-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span>
                ① The cost that the "Advertiser" must pay to the "Company" for using this advertising service is the same as the "Advertising Service Usage Fee Billing Criteria" (
              </span>
              <span className="c11">
                <a
                  className="c7"
                  href="https://www.google.com/url?q=https://marketinghub.esmplus.com/ad-guide/index.html&sa=D&source=editors&ust=1705559670312494&usg=AOvVaw3nduPs_p-KOWS-OQDh9qE5"
                >
                  Appendix 1.
                </a>
              </span>
              <span className="c0">
                ). However, in the case of Cost per Click (CPC) advertising products, the service usage fee will be charged even if the user of the "Advertising Media" who clicked on the advertising material did not check the content of the advertisement.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② The "Company" automatically deducts the advertising service usage fee from the sales deposit deposited by the "Advertiser" into the advertising media on a daily basis as specified in the preceding paragraph. However, if the "Advertiser" holds "Advertising Money," it will be deducted first.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ The "Company" issues a tax invoice for the actual advertising service usage fee executed by the "Advertiser," and the "Advertiser" can print the tax invoice through "Icarus."
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ The advertising service usage fee under paragraph 1 of this Article may be changed, and in such cases, the "Company" will post it on the initial screen of "Icarus Advertising Center."
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ In case of compensation or refund reasons arising during the use of "advertising services," the "Company" may pay with "advertising money."
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">Article 8 (Notification to "Advertiser")</span>
          </p>
          <ol className="c4 lst-kix_jvq872n28gbj-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① When the "Company" notifies the "Advertiser," unless there is a separate provision in the "Basic Terms and Conditions" and these "Terms and Conditions," the notification may be made to one of the email addresses, (mobile) phone numbers, or addresses provided by the "Advertiser" to "Icarus Advertising Center" or through means such as a notification window when logging into the "Icarus Advertising Center."
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② The "Advertiser" must provide the "Company" with actual contactable email, (mobile) phone numbers, addresses, etc., and keep this information up-to-date, and must check the notifications from the "Company."
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ The "Company" shall not be liable for any damages caused by the "Advertiser's" negligence in fulfilling the obligations under the preceding paragraph.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">Article 9 (Termination, Termination, and Refund of Use Agreement)</span>
          </p>
          <ol className="c4 lst-kix_1if9dzlexiok-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① The "Advertiser" may terminate the advertising usage contract by accessing the "Icarus Advertising Center" at any time.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② The "Company" may terminate the usage agreement if any of the following reasons occur. In this case, the "Company" shall notify the "Advertiser" of the reason for termination by email, telephone, fax, or other means, indicating the reason for termination. However, the "Company" may give the "Advertiser" an opportunity to express their opinions on the reason for termination in advance.
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_1if9dzlexiok-1 start" start={1}>
            <li className="c6 li-bullet-0">
              <span className="c0">
                1) If the "Advertiser" loses or is suspended from "Icarus" membership
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                2) If the "Advertiser" fails to deposit "sales deposit," making it impossible for the "Company" to execute the advertisement
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                3) If the "Advertiser" makes a false application, violates related laws, or violates the "Basic Terms and Conditions" and these "Terms and Conditions"
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                4) If it is objectively judged that the "Advertiser" cannot fulfill this contract
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_1if9dzlexiok-0" start={3}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ If the "Company" terminates the use agreement, the service usage application applied for by the "Advertiser" is automatically canceled, and the "Company" refunds the remaining amount including advertising money (excluding cases issued free of charge) to the "Advertiser" in the form of a sales deposit after the advertisement is terminated.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">Article 10 (Obligations of the "Company")</span>
          </p>
          <ol className="c4 lst-kix_jryf0al0udev-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① The "Company" shall comply with related laws and these "Terms and Conditions" and make continuous and stable efforts to provide "advertising services" to the best of its ability.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② The "Company" shall equip itself with security systems to protect personal information (including credit information) for the protection of personal information and shall disclose and comply with the privacy policy.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ The "Company" shall process any opinions or complaints raised by the "Advertiser" regarding related laws in a fair manner if they are deemed reasonable, and may convey the processing process and results to the "Advertiser" through the bulletin board within "Icarus Advertising Center," electronic mail, etc.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ The "Company" may provide the "Advertiser" with advertising setting functions to enhance advertising effectiveness, and shall make its best efforts to ensure that advertisements are exposed according to the conditions set by the "Advertiser."
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">Article 11 (Obligations of "Advertiser")</span>
          </p>
          <ol className="c4 lst-kix_n291az369z9f-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① The "Advertiser" must comply with the relevant laws and regulations such as the Electronic Commerce Act, the Telecommunications Business Act, the Act on Fair Labeling and Advertising, the Consumer Basic Act, as well as these Terms and Conditions, individual agreements, and seller operational policies, including policies publicly established by the Company, for customer protection, service reliability enhancement, etc., when registering advertising materials along with keywords in advertising media.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② To ensure smooth provision of services by the Company, the "Advertiser" must regularly check notices posted on the Icarus Advertising Center or sent to their email by the Company.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ The "Advertiser" may use the service for the purpose of advertising only and must not provide or leak information provided by the service to third parties.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ In the event of a dispute arising between the "Advertiser" and the Company, customers, or third parties due to the fault of the "Advertiser," the "Advertiser" must promptly indemnify the Company at their own expense and responsibility and compensate the Company, customers, or third parties for any damages incurred.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ The "Advertiser" must not lend or transfer their service usage rights to third parties other than themselves. However, the Company may grant authorization to an advertising agency designated by the "Advertiser" ("Advertising Agency") among the agencies posted on the Icarus Advertising Center, and the supervisory responsibility for the Advertising Agency lies with the "Advertiser." The effect of the designation of the Advertising Agency remains in place for the period announced by the Company on the Icarus Advertising Center ("Minimum Retention Period"), and the "Advertiser" cannot designate another advertising agency within the Minimum Retention Period. The "Minimum Retention Period" is subject to verification.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑥ In the event that the contractual relationship between the Company and the Advertising Agency is terminated or canceled, the "Advertiser" may choose to perform advertising tasks directly or designate another advertising agency with which the Company has a contractual relationship. If the "Advertiser" does not make a choice, it will automatically be changed to perform advertising tasks directly.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑦ If there is no record of logging in or paying the service usage fee by the Advertising Agency designated by the "Advertiser" from the day the Advertising Agency was designated by the "Advertiser" or from the day the service usage fee was executed until 365 days, the Company will cancel the use of the Icarus ID account of the Advertising Agency designated by the "Advertiser" and the "Advertiser" will perform advertising tasks directly. However, if there is a record of logging in and paying the service usage fee through the designated Advertising Agency within 7 days after the notice of cancellation of the Icarus ID account usage, the re-use is possible.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">Article 12 ("Company" Disclaimer)</span>
          </p>
          <ol className="c4 lst-kix_v1ruob1mbwh3-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① The Company shall be exempt from liability for the provision of services in the event of force majeure, external attacks on service usage such as DDoS, IDC failures, and telecommunication service provider line failures, which the Company cannot predict or control.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② The Company shall not be liable for damages incurred by the "Advertiser" due to the service interruption as per the preceding paragraph, unless there is intentional or gross negligence on the part of the Company, and it shall not compensate for business losses, special damages, etc.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ The services provided by the Company to the "Advertiser" are limited to providing advertising platforms for the exposure of advertisements. The Company does not act as an agent or representative for the "Advertiser" or the "Advertiser's" advertising agency, nor does it assume any responsibility for the sale of goods or other items.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ The Company shall not be liable for service interruptions caused by the fault of the "Advertiser."
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ The Company shall not be liable for the reliability, accuracy, legality, etc., of the products advertised by the "Advertiser," and it shall not be liable for any damages suffered by the "Advertiser," customers, or third parties relying on them. However, if the "Advertiser" violates relevant laws or the Company's advertising policies, the Company may refuse to post the advertisement, but it shall not be liable for the posting or suspension of advertisements.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">Article 13 (Obligation of Personal Information Protection and Confidentiality)</span>
          </p>
          <ol className="c4 lst-kix_4wleabl6qpn9-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① Each party shall make efforts to protect the personal information of the "Advertiser" in accordance with the relevant laws, such as the Act on Promotion of Information and Communications Network Utilization and Information Protection, etc. The protection and use of the "Advertiser's" personal information shall be subject to the Company's regulations.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② Except as required by law, each party shall not disclose to third parties and shall not use for purposes other than the performance of the service contract any confidential information such as personal information, technical information, management information, etc., acquired from the other party.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">Article 14 (Dispute Resolution)</span>
          </p>
          <p className="c1">
            <span className="c0">
              These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of Korea, and any disputes arising in connection with the use of this service shall be subject to the exclusive jurisdiction of the competent court under the Civil Procedure Act.
            </span>
          </p>
          <p className="c1">
            <span className="c2">Article 15 (External Platform Advertising)</span>
          </p>
          <ol className="c4 lst-kix_6xlv5a4aatsk-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① The Company does not guarantee where, how frequently, or the priority between different advertisers' advertising materials are posted on the external platform advertising network.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② Without notice or compensation to the advertiser, the Company may change the technology of external platform advertising or discontinue the publication of advertising materials, or may not start such publication.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ The Company measures various indicators necessary to calculate clicks and/or advertising fees to be borne by the advertiser through the server of the external platform advertising company selected by the Company and provides the measurement results to the advertiser.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ External platform advertising may be subject to fraudulent or inappropriate acts by third parties that may affect clicks or other fees under this Agreement. The Company shall not be liable for any responsibility for such fraudulent clicks or other inappropriate acts by third parties.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ The advertiser must diligently review the measurement results provided by the Company to determine whether to continue external platform advertising. The advertiser cannot object to the measurement results as stated in paragraph (3) above.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c9 c13">These Terms and Conditions shall apply from {formatDateWithLabels()}.</span>
          </p>
          <p className="c1">
            <span>Attachment 1. </span>
            <span className="c11">
              <a
                className="c7"
                href="https://www.google.com/url?q=https://marketinghub.esmplus.com/ad-guide/index.html&sa=D&source=editors&ust=1705559670314819&usg=AOvVaw2d5HTIoJhW2m_ngSIsP4Gl"
              >
                Advertising Product and Service Usage Fee Charging Standards
              </a>
            </span>
          </p>
          <p className="c1">
            <span>Attachment 2. </span>
            <span className="c11">
              <a
                className="c7"
                href="https://www.google.com/url?q=https://ad.esmplus.com/Member/SignIn/LogOn?ReturnUrl%3D%252fcpc%252fmain%252fPopupRulesService&sa=D&source=editors&ust=1705559670315014&usg=AOvVaw2edwvrjsMZ2yJeFWR8r4SI"
              >
                Advertising Operations Guide
              </a>
            </span>
          </p>
          <p className="c1">
            <span className="c2">Supplementary Provision</span>
          </p>
          <p className="c1 c14">
            <span className="c2" />
          </p>
          <p className="c1">
            <span className="c2">Article 1 (Effective Date)</span>
          </p>
          <p className="c1">
            <span className="c9 c12">These Terms and Conditions shall apply from {formatDateWithLabels()}.</span>
          </p>
          <p className="c1">
            <span className="c0">&nbsp;</span>
          </p>
          <p className="c8">
            <span className="c0" />
          </p>
        </>
        :
        <>
          <p className="c1">
            <span className="c10">이용약관</span>
          </p>
          <p className="c1">
            <span className="c2">제 1 조 (목적)</span>
          </p>
          <p className="c1">
            <span className="c0">
              본 약관은 ㈜모아드(이하 "회사")가 제공하는 광고 서비스(아래 정의)를
              "광고주"(아래 정의)에게 제공함에 있어 "회사"와 "광고주"의 권리, 의무 및
              책임사항을 규정함을 목적으로 합니다.
            </span>
          </p>
          <p className="c1">
            <span className="c2">제 2 조 (정의)</span>
          </p>
          <p className="c1">
            <span className="c0">
              본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            </span>
          </p>
          <ol className="c4 lst-kix_bwulzs2i1l18-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① "광고" (이하 "광고"라고 함)라 함은 "회사"가 "광고주"가 신청한 광고
                상품(아래 정의)의 내용과 절차에 따라 "광고주"의 "광고 소재"(아래 정의)를
                "광고매체"에 노출하는 것을 말합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "광고소재"라 함은 "광고주"가 제작하여 광고매체에 등록한 상품 설명,
                상품 사진, 텍스트 또는 이미지 등 형태의 제작물을 말합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span>
                ③ "광고 상품"이라 함은 "광고주"의 "광고 소재"를 "광고매체"에 게재하기
                위하여 "회사"가 "광고주"에게 판매하는 것으로 광고 상품의 종류, 노출
                형태, 위치 등 구체적 내용은 광고 상품 및 광고 서비스 이용료 과금 기준({" "}
              </span>
              <span className="c11">
                <a
                  className="c7"
                  href="https://www.google.com/url?q=https://marketinghub.esmplus.com/ad-guide/index.html&sa=D&source=editors&ust=1705559670310376&usg=AOvVaw3WwAYK3RoTe2WqHN0SQdqs"
                >
                  별첨1.
                </a>
              </span>
              <span className="c0">&nbsp;)과 같습니다.</span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ "광고 서비스" 라 함은 "광고주"가 구매한 광고 상품의 내용대로
                "광고주"의 "광고 소재"를 "광고매체"에 노출하고 광고 등록, 광고 관리,
                리포트 등 제반 서비스를 말합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ "광고주"라 함은 본 약관에서 정한 절차에 따라 "서비스"를 신청 및
                이용하는 자를 말합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span>
                ⑥ "모아드 광고센터"라 함은 "광고주"의 광고 신청, 게재, 관리, 취소 등을
                위해 "회사"가 "광고주"에게 제공하는 서비스 페이지(
              </span>
              <span className="c9">홈페이지 URL</span>
              <span className="c0">)를 말합니다.</span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑦ "서비스 이용료"라 함은 서비스 이용대가로 "광고주"가 "회사"에 지급하는
                금액을 말합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑧ "외부플랫폼광고" 라 함은 "회사" 에서 지정한 인터넷 및 모바일 광고
                플랫폼을 통해 "광고매체"를 제공하는 "광고 서비스" 입니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑬ ”광고성 이머니”라 함은 “회사”가 프로모션 혜택으로 또는 보상 및 환불을
                위하여 “광고주”에게 발급하는 전자적 지급수단을 말합니다. “광고성
                이머니”는 별도 정함이 없는 한 발급일부터 3개월간 유효하며, “광고 상품”의
                결제시에만 사용할 수 있습니다.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">제 3 조 (약관의 게시 및 구성)</span>
          </p>
          <ol className="c4 lst-kix_9lbtd2o11732-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span>
                ① "회사"는 본 약관의 내용을 "광고주"가 쉽게 알 수 있도록 "모아드(
              </span>
              <span className="c9">홈페이지 URL</span>
              <span className="c0">)"에 게시합니다.</span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "회사"가 본 약관을 개정하는 경우에는 적용 일자 및 개정 사유를 명시하여
                현행 약관과 함께 제1항의 방식에 따라 그 적용일자 칠(7)일 이전부터
                적용일자 전일까지 공지합니다. 다만 "광고주"에게 불리하게 약관을 변경하는
                경우에는 최소한 삼십(30)일 이상의 사전 유예기간을 두고 공지합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ 회사가 전항에 따라 개정약관을 공지 또는 통지하면서 "광고주"에게 전항의
                기간 내에 의사표시를 하지 않으면 동의한 것으로 본다는 뜻을 명확하게 공지
                또는 통지하였음에도 "광고주"가 명시적으로 거부의 의사표시를 하지 아니한
                경우 "광고주"가 개정약관에 동의한 것으로 봅니다.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">제 4 조 (이용 계약 성립 등)</span>
          </p>
          <ol className="c4 lst-kix_10h1fv8hz3aq-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① "광고주"는 "회사"가 제공하는 다음의 "약관"의 내용에 동의를 한 다음
                "회사"가 정한 절차에 따라 이용 신청을 하고 "회사"가 이러한 신청에 대하여
                승낙함으로써 체결됩니다.
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_10h1fv8hz3aq-1 start" start={1}>
            <li className="c6 li-bullet-0">
              <span className="c0">1) "기본 약관"에 대한 동의</span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">2) "본 약관"에 대한 동의</span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">2) "광고주" 가입 완료 확인</span>
            </li>
          </ol>
          <ol className="c4 lst-kix_10h1fv8hz3aq-0" start={2}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "회사"는 "광고주"가 다음의 각 호의 하나의 사유가 있을 경우 광고 서비스
                이용을 제한할 수 있습니다.
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_10h1fv8hz3aq-1 start" start={1}>
            <li className="c6 li-bullet-0">
              <span className="c0">
                1) 허위 정보를 기재하거나 "회사"가 제시한 내용을 기재하지 않은 경우
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                2) 기본 약관 위반 등의 이유로 "광고주" 자격을 상실할 경우
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                3) 기타 "회사"가 합리적인 판단에 의하여 광고 서비스 이용제한이
                필요하다고 인정되는 경우
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">제 5 조 (광고의 등록, 제한 및 관리)</span>
          </p>
          <ol className="c4 lst-kix_gcnk1726ag0y-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span>
                ① "회사"는 광고 상품의 종류, 광고 영역, 등록 절차, 과금 방법 등을 광고
                상품 및 광고 서비스 이용료 과금 기준({" "}
              </span>
              <span className="c11">
                <a
                  className="c7"
                  href="https://www.google.com/url?q=https://marketinghub.esmplus.com/ad-guide/index.html&sa=D&source=editors&ust=1705559670311450&usg=AOvVaw2xqChz_zRfa0AskcI0gHis"
                >
                  별첨1.
                </a>
              </span>
              <span className="c0">
                &nbsp;) 및 "모아드 광고센터" 에 공지하며 "광고주"는 광고 신청 전에
                이를 신중히 확인하여야 합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "회사"는 "광고주"가 전항에 따라 "광고주"가 신청한 "광고" 및
                "광고소재"에 대하여 "회사"에서 정한 절차, 기준 및 방식에 부합하는지
                형식적인 여부만을 검수하는 것에 그치며 "광고"와 "광고 소재"간의 실질적
                권리 유효성, 범위 및 권리의 주체, 관련 계약 등 실질적 관계에 대한 심사를
                하지 않습니다. "회사"는 권리주장자의 신고 또는 요청에 의한 "광고" 또는
                "광고소재"의 취소, 삭제 또는 일시 중지에 대해 일체의 책임을 지지 않으며
                이는 권리주장자와 "광고주"간에 해결되어야 합니다."회사"는 "회사"의 검수
                승인을 득한 광고를 "광고주"의 "광고소재"를 "광고매체"에 게재합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ "광고주"는 광고 게재 전에 판매예치금을 예치하여야 합니다. "광고주"가
                사전에 충분히 판매예치금을 예치하지 않은 경우 "광고"의 게재가 중단될 수
                있으며 이로 인해 발생하는 문제에 대한 책임은 "광고주"에게 있습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ "회사"는 "광고주"의 "광고" 및 "광고 소재"가 아래 각 호 중 하나에
                해당하는 경우 "광고"의 게재를 제한 또는 중단할 수 있으며 광고 중단과
                관련하여 회사는 책임을 지지 않습니다.
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_gcnk1726ag0y-1 start" start={1}>
            <li className="c6 li-bullet-0">
              <span className="c0">
                1) "광고주"가 "회사"가 제공하지 않는 방식으로 "광고 서비스"에 접속하는
                행위
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                2) 클릭 수, 노출 수 등을 임의로 또는 부정하게 변경(생성, 감소, 증가)하는
                행위
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                3) "회사"에 법률적 또는 재산적 위험을 발생시키거나 발생시킬 우려가 있는
                행위
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                4) "회사"의 광고매체, 서버 및 설비 등 시스템 부하를 야기하는 행위
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                5) "회사"의 광고 운영 가이드(별첨2)를 위반하는 행위
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                6) 기타 "광고 서비스"의 정상적인 운영을 방해하는 행위
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_gcnk1726ag0y-0" start={5}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ "광고주"는 "회사"가 정한 절차와 방식에 따라 언제든지 "모아드"에
                접속하여 "광고"의 구매, 추가, 삭제, 게재, 게재 중지 등을 신청할 수
                있습니다.
              </span>
            </li>
          </ol>
          <p className="c16 c14">
            <span className="c0" />
          </p>
          <p className="c14 c16">
            <span className="c0" />
          </p>
          <p className="c1">
            <span className="c2">제 6 조 (광고 서비스의 변경 및 중단)</span>
          </p>
          <ol className="c4 lst-kix_6ube3zqa3pt2-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① "회사"는 광고가 게재되는 광고매체의 범위 및 광고매체에서의 게재 영역,
                게재 순서, 게재 정보, UI 등 (이하 "광고 영역 등"이라고 함)에 대한 결정
                권한을 가지며, 변경 또는 추가할 수 있습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "광고 영역 등"의 내용에 변경이 있을 경우 "회사"는 변경 전에
                "모아드"내 게시판에 공지합니다. "광고주"는 "광고 서비스"의 변경 내용에
                동의하지 않을 경우 언제든지 "모아드"내에서 "광고"의 노출을 중단할 수
                있습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ "회사"는 수시로 "광고 서비스"의 품질 향상 및 "광고"의 효과 증대 등을
                위해 일부 키워드와 일부 트래픽을 대상으로 하는 테스트를 별도의 공지 없이
                진행할 수 있습니다. 단, 테스트가 아래 각 호 중 하나에 해당하는 경우,
                최소 7일 전에 모아드 공지사항란을 통해 테스트 진행 내용을 별도
                공지합니다.
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_6ube3zqa3pt2-1 start" start={1}>
            <li className="c6 li-bullet-0">
              <span className="c0">
                1) 게재된 광고의 노출 순위가 입찰 결과에 불구하고 일부 변경되는 경우
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                2) 게재된 광고가 입찰 결과에 불구하고 일부 미노출 되는 경우
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">3) 게재된 광고의 UI가 일부 변경되는 경우</span>
            </li>
          </ol>
          <ol className="c4 lst-kix_6ube3zqa3pt2-0" start={4}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ "회사"는 정보통신설비의 보수 점검 및 교체와 통신, 시스템의 장애 등의
                사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
                서비스 중단의 경우 "회사"는 모아드 광고센터 메인, 공지사항 게시판이나
                전자우편, 전화 등의 방법으로 즉시 중단 사실을 "광고주"에게 통지합니다.
                단, "회사"가 미리 예측할 수 없는 사정에 의한 서비스의 중단의 경우에는
                예외로 합니다.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">제 7 조 (광고 서비스 이용료 정산 등)</span>
          </p>
          <ol className="c4 lst-kix_9z7ttbbevln3-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span>
                ① "광고주"가 본 광고 서비스를 이용하는 대가로 "회사"에 지급해야 할
                비용은 "광고 서비스 이용료 과금 기준"({" "}
              </span>
              <span className="c11">
                <a
                  className="c7"
                  href="https://www.google.com/url?q=https://marketinghub.esmplus.com/ad-guide/index.html&sa=D&source=editors&ust=1705559670312494&usg=AOvVaw3nduPs_p-KOWS-OQDh9qE5"
                >
                  별첨1.
                </a>
              </span>
              <span className="c0">
                &nbsp;)과 같습니다. 단, Cost per Click (CPC) 광고 상품의 경우 광고소재을
                클릭한 "광고매체"의 이용자가 광고 소재의 내용을 확인하지 않았다고
                하더라도 서비스 이용료는 부과됩니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "회사"는 전항의 광고 서비스 이용료를 "광고주"가 광고매체에 예치한
                판매예치금에서 매일 수시로 자동 차감합니다. 단, “광고성 이머니”를 보유한
                경우 우선하여 차감합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ "회사"는 "광고주"가 실제 집행한 광고 서비스 이용료에 대하여
                세금계산서를 발행하며 "광고주"는 해당 세금계산서를 "모아드"를 통하여
                출력할 수 있습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ 본 조 제1항의 광고 서비스 이용료는 변동될 수 있으며, 이러한 경우
                "회사"는 "모아드 광고센터" 초기 화면에 게시합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ “광고 서비스” 이용 중 보상 또는 환불 사유가 발생하는 경우 “회사”는
                “광고성 이머니”로 지급할 수 있습니다.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">제 8 조 ("광고주"에 대한 통지)</span>
          </p>
          <ol className="c4 lst-kix_jvq872n28gbj-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① "회사"가 "광고주"에 대하여 통지를 하는 경우 "기본 약관" 및 "본 약관"에
                별도의 규정이 없는 한 "광고주"가 "모아드 광고센터"에 제공한
                전자우편주소, (휴대)전화번호, 주소 중 하나로 통지하거나, 통지에 갈음하여
                "광고주"의 "모아드 광고센터" 로그인시 알림창 등의 수단으로 할 수
                있습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "광고주"는 "회사"에 실제로 연락이 가능한 전자우편,(휴대)전화번호, 주소
                등의 정보를 제공하고 해당 정보들을 최신으로 유지하여야 하며,"회사"의
                통지를 확인하여야 합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ "회사"는 "광고주"가 전항의 의무를 소홀히 하여 발생한 불이익에 대한
                책임을 지지 않습니다.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">제 9 조 (이용 계약 해지, 종료 및 환불)</span>
          </p>
          <ol className="c4 lst-kix_1if9dzlexiok-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① "광고주"는 언제든지 "모아드 광고센터"에 접속하여 "광고" 이용계약을
                해지할 수 있습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "회사"는 다음 각 호의 하나의 사유가 발생한 경우 이용계약을 해지할 수
                있습니다. 이 경우 "회사"는 "광고주"에게 이메일(e-mail), 전화, 팩스
                기타의 방법을 통하여 해지사유를 밝혀 해지의사를 통지합니다. 다만,
                "회사"는 해당 "광고주"에게 사전에 해지사유에 대한 의견진술의 기회를
                부여할 수 있습니다.
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_1if9dzlexiok-1 start" start={1}>
            <li className="c6 li-bullet-0">
              <span className="c0">
                1) "광고주"가 모아드 회원 자격을 상실하거나 정지된 경우
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                2) "광고주"가 "판매예치금"을 예치하지 못하여 "회사"가 광고를 집행할 수
                없는 경우
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                3) "광고주"가 허위신청, 관련 법령 또는 "기본 약관" 및 본 약관을 위반한
                경우
              </span>
            </li>
            <li className="c6 li-bullet-0">
              <span className="c0">
                4) 기타 "광고주"가 본 계약을 이행할 수 없다고 객관적으로 판단된 경우
              </span>
            </li>
          </ol>
          <ol className="c4 lst-kix_1if9dzlexiok-0" start={3}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ "회사"가 이용계약을 해지하는 경우 "광고주"가 신청한 서비스 이용신청은
                자동으로 취소되고,"회사"는 광고 해지 이후 광고성 이머니(무상으로 발급한
                경우를 제외합니다)를 포함한 잔여 금액은 판매예치금 형태로 "광고주"에게
                환급합니다.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">제 10 조 ("회사"의 의무)</span>
          </p>
          <ol className="c4 lst-kix_jryf0al0udev-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① "회사"는 관련 법령과 "본 약관"을 준수하며, 계속적이고 안정적으로 "광고
                서비스"를 제공하기 위하여 최선을 다하여 노력합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "회사"는 "광고주"가 안정하게 "광고 서비스"를 이용할 수 있도록
                개인정보(신용정보 포함) 보호를 위하여 보안시스템을 갖추어야
                개인정보취급방침을 공시하고 준수합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ "회사"는 관련 법령과 관련하여 "광고주"로부터 제기된 의견이나 불만이
                정당하다고 인정될 경우 이를 처리하여야 하며 "모아드 광고센터" 내
                게시판, 전자우편 등을 통하여 "광고주"에게 처리과정 및 결과를 전달할 수
                있습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ "회사"는 광고 효과 향상을 위해 "광고주"에게 광고 설정기능을 제공할 수
                있으며, "광고주"가 설정한 조건에 따라 광고가 노출될 수 있도록 최선을
                다합니다.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">제 11 조 ("광고주"의 의무)</span>
          </p>
          <ol className="c4 lst-kix_n291az369z9f-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① "광고주"는 광고매체에 키워드와 함께 등록한 광고 소재를 전자상거래법,
                정통망법, 표시광고의공정화에관한법률, 소비자기본법 등 관련법령 및 본
                약관, 개별약정, 판매자 운영정책을 비롯하여 고객 보호 및 서비스 신뢰도
                제고 등을 위해 회사가 제정하여 공개한 기타 정책을 준수하여야 합니다
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "회사"의 원활한 서비스 제공을 위하여 "광고주"는 모아드 광고센터에
                게시되거나 회사에 통보한 자신의 이메일로 전달되는 공지사항 등을 수시로
                확인하여야 합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ "광고주"는 광고 이용 목적에 한하여 서비스를 이용할 수 있으며, 서비스에
                의하여 제공된 정보를 제3자에게 제공 또는 유출하여서는 안됩니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ "광고주"는 자신의 귀책 사유로 인해 "회사"와 "광고주", 고객 또는
                제3자와의 사이에 분쟁이 발생한 경우 즉시 자신의 비용과 책임으로 회사를
                면책시켜야 하고 회사, 고객 또는 제3자 등에게 손해가 발생한 경우 이를
                즉시 배상하여야 합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ "광고주"는 본 약관에 따른 서비스 이용권한을 본인 외에 타인에게 대여
                하거나 양도 하여서는 안됩니다. 단, "회사"는 "광고주"가 동의한 경우에
                한해 "모아드 광고센터"에 게시된 대행사 중 "광고주"가 지정한
                대행사("광고대행사")에게 "모아드 광고센터" 및 관련 시스템 이용 권한을
                부여할 수 있으며 "광고대행사"에 대한 감독책임은 "광고주"에게 귀속됩니다.
                "광고주"가 "광고대행사"를 지정하면 해당 지정의 효과는 "회사"가 "모아드
                광고센터"에 공지한 기간동안 (이하 "최소 유지기간") 유지되며, "광고주"는
                "최소 유지기간" 내에는 다른 "광고대행사"를 다시 지정할 수 없습니다.
                “최소 유지기간”은 확인은 가능합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑥ "회사"와 "광고대행사간"의 계약 관계가 종료 또는 해지되는 경우
                "광고주"는 자신의 선택에 따라 직접 광고 업무를 수행하거나 회사와
                계약관계에 있는 다른 광고대행사로 지정할 수 있습니다. "광고주"의 선택이
                없을 경우, 자동으로 직접 광고 업무를 수행하는 것으로 변경됩니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑦ "회사"는 "광고대행사"가 "광고주"가 "광고대행사"를 지정한 날 또는
                "광고대행사"가 "서비스 이용료"를 집행한 날부터 365일까지 로그인 과
                "서비스 이용료"를 지급한 이력이 없을 경우 "광고주"가 "광고대행사"에게
                지정한 "광고대행사"의 모아드 ID 계정 이용을 취소하며 "광고주"가 직접
                광고 업무를 수행하는 것으로 변경합니다. 단, 모아드 ID 계정 이용 해지
                예고 후 7일 이내에 "광고주"가 해당 "광고대행사"를 통해서 "로그인"과
                "서비스 이용료"를 지급한 이력이 있을 경우 재이용이 가능합니다.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">제 12 조 ("회사"의 면책)</span>
          </p>
          <ol className="c4 lst-kix_v1ruob1mbwh3-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① "회사"는 천재지변, DDoS 등 서비스 이용에 대한 외부 공격, IDC 장애,
                기간 통신사업자의 회선 장애 등 회사가 예측 및 통제할 수 없는 사유로
                서비스를 정상적으로 제공할 수 없는 경우 서비스 제공에 대한 책임이
                면제됩니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② 전항의 서비스 중단으로 인하여 발생한 "광고주"의 손해에 대하여 "회사"는
                고의 또는 중대한 과실이 없는 한 책임을 부담하지 않으며 영업손실, 특별
                손해 등은 배상하지 않습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ "회사"가 "광고주"에게 제공하는 서비스는 "회사"가 광고를 노출할 수
                있도록 광고 플랫폼을 제공하는 것에 국한합니다. "회사"는 어떠한 경우에도
                "광고주"나 "광고주"의 대행사 등 어느 누구도 대리하거나 대행하지 않으며,
                재화 등의 판매에 있어서 어떠한 책임도 부담하지 않습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ "회사"는 "광고주"의 귀책사유로 인한 서비스 이용의 장애 등에 대하여
                책임을 지지 않습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ "회사"는 "광고주"가 광고한 상품의 신뢰도, 정확성, 적법성 등에 관하여는
                책임을 지지 않으며, 이를 신뢰함으로써 "광고주", 고객 기타 제3자가 입은
                손해에 대하여 책임을 지지 않습니다. 다만, "광고주"가 관련 법령 또는
                회사의 광고정책을 위반하는 경우 "회사"는 광고를 게재하지 않을 수 있으며,
                광고 게재 또는 중단과 관련하여 "회사"는 책임을 지지 않습니다.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">제 13 조 (개인정보보호의무 및 비밀유지)</span>
          </p>
          <ol className="c4 lst-kix_4wleabl6qpn9-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① 각 당사자는 "정보통신망 이용촉진 및 정보보호 등에 관한 법률" 등 관계
                법령이 정하는 바에 따라 "광고주"의 개인정보를 보호하기 위해 노력합니다.
                "광고주"의 개인정보의 보호 및 사용에 대해서는 "회사"의 적용됩니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② 각 당사자는 법령상 요구되는 경우를 제외하고는 상대방으로부터 취득한
                제1항의 개인정보, 기술정보, 경영 정보 등 비밀로 관리되는 정보를
                제3자에게 누설하여서는 안되며 그 정보를 이용계약의 이행 이외의 목적으로
                이용하지 않습니다.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c2">제 14 조 (분쟁의 해결)</span>
          </p>
          <p className="c1">
            <span className="c0">
              본 약관은 대한민국법령에 의하여 규정되고 이행되며, 본 서비스 이용과
              관련하여 발생한 분쟁에 대해서는 민사소송법상의 주소지를 관할하는 법원을
              합의관할로 합니다.
            </span>
          </p>

          <p className="c1">
            <span className="c2">제 15 조 (외부플랫폼광고)</span>
          </p>
          <ol className="c4 lst-kix_6xlv5a4aatsk-0 start" start={1}>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ① "회사"는 "외부플랫폼광고"의 "광고소재"가 "외부플랫폼광고" 네트워크상에
                게시됨에 있어서 "광고소재"가 어디에서, 얼마나 자주 게시되는지, 서로 다른
                "광고주" 간에 우선순위가 정해지는 방식에 관하여 보증하지 않습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ② "회사"는 "광고주"에 대한 통지 또는 보상 없이, "외부플랫폼광고 " 기술을
                변경하거나 "광고소재"의 게시를 중단하거나 그러한 게시를 시작하지 않을 수
                있습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ③ "회사"는 "회사"가 선택한 외부플랫폼 광고업체의 서버를 통해서, 클릭수
                및/또는 "광고주"가 부담할 광고요금을 산정하는데 필요한 기타 지표를
                측정하고, 측정결과를 "광고주"에게 제공합니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ④ "외부플랫폼광고"는 제3자가 기망적이거나 부적절한 목적으로 클릭수 또는
                기타 본 계약상 요금에 영향을 미칠 수 있는 행위를 할 위험이 있습니다.
                "회사"는 위와 같은 제3자의 부정클릭 또는 기타 발생할 수 있는 부적절한
                행위와 관련하여 "광고주" 에 대해 어떠한 책임도 부담하지 않습니다.
              </span>
            </li>
            <li className="c3 li-bullet-0">
              <span className="c0">
                ⑤ "광고주"는 "외부플랫폼광고"를 시행함에 있어 "회사"가 제공하는
                측정결과를 성실하게 검토하여 "외부플랫폼광고"의 계속 여부를 결정하여야
                합니다. "광고주"는 위 (3)항의 측정결과에 대하여 "회사"에 대하여 이의를
                제기할 수 없습니다.
              </span>
            </li>
          </ol>
          <p className="c1">
            <span className="c9 c13">본 약관은 {formatDateWithLabels()}부터 적용됩니다.</span>
          </p>
          <p className="c1">
            <span>별첨1. </span>
            <span className="c11">
              <a
                className="c7"
                href="https://www.google.com/url?q=https://marketinghub.esmplus.com/ad-guide/index.html&sa=D&source=editors&ust=1705559670314819&usg=AOvVaw2d5HTIoJhW2m_ngSIsP4Gl"
              >
                광고 상품 및 서비스 이용료 과금 기준
              </a>
            </span>
          </p>
          <p className="c1">
            <span>별첨2. </span>
            <span className="c11">
              <a
                className="c7"
                href="https://www.google.com/url?q=https://ad.esmplus.com/Member/SignIn/LogOn?ReturnUrl%3D%252fcpc%252fmain%252fPopupRulesService&sa=D&source=editors&ust=1705559670315014&usg=AOvVaw2edwvrjsMZ2yJeFWR8r4SI"
              >
                광고 운영 가이드
              </a>
            </span>
          </p>
          <p className="c1">
            <span className="c2">부칙</span>
          </p>
          <p className="c1 c14">
            <span className="c2" />
          </p>
          <p className="c1">
            <span className="c2">제1조 (적용일자)</span>
          </p>
          <p className="c1">
            <span className="c9 c12">본 약관은 {formatDateWithLabels()}부터 적용됩니다.</span>
          </p>
          <p className="c1">
            <span className="c0">&nbsp;</span>
          </p>
          <p className="c8">
            <span className="c0" />
          </p>
        </>
      }
    </>
  );
}

export default TermsOfUse
