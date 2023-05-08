import React from 'react'

export default function StatisticsModulePage() {
  const date_start = '2023. 03. 01';
  const date_end = '2023. 03. 08';
  const ad_amount = '123,456,789';
  const driving_vehicle = [
    {
      'title':'모든 차량수',
      'data':'120',
  },
  {
      'title':'운행차량',
      'data':'120',
  },
  {
      'title':'운행예정',
      'data':'',
  },
  {
      'title':'종료예정',
      'data':'60',
  },
  {
      'title':'종료',
      'data':'20',
  },
  ];
  return (
    <>
    <div id="statistics" class="statistics page">
    <div class="container">
        <div class="board-content">
            <div class="inner-header-wrap">
                {/* <?php
                    get_template_part('templates/part/inner-header', null, $args);
                ?> */}
            </div>
            <div class="statistics-content">
                <div class="step-01">
                    <div class="ad-amount">
                        <div class="title-wrap">
                            <div class="title">광고 금액</div>
                            <div class="line"></div>
                            <a href="/ad-amount" class="text">view all</a>
                        </div>
                        <div class="ad-amount-box">
                            <div class="box-wrap">
                                <div class="date">{date_start} ~ {date_end}</div>
                                 <div class="amount">{ad_amount ? ad_amount : '-'}</div>
                                
                            </div>
                        </div>
                    </div>
                    
                    <div class="driving-vehicle">
                        <div class="title-wrap">
                            <div class="title">운행차량</div>
                            <div class="line"></div>
                        </div>
                        <div class="driving-vehicle-box">
                            <ul class="list-wrap">
                                {/* <?php foreach($driving_vehicle as $data): ?>
                                <li class="list">
                                    <div class="title"><?= $data['title'] ?></div>
                                    <?php if($data['data']): ?>
                                        <div class="data"><?= $data['data'] ?> 대</div>
                                    <?php else: ?>
                                        <div class="data">-</div>
                                    <?php endif; ?>
                                </li>
                                <?php endforeach; ?> */}
                                {
                                  driving_vehicle.map((data) =>
                                  <li class="list">
                                  <div class="title">{data.title}</div>
                                  <div class="data">{data.data ? data.data+'대' : '-'}</div>
                                  </li>
                                  )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="step-02">
                    <div class="title-wrap">
                        <div class="title">운행거리/운행시간</div>
                        <div class="line"></div>
                    </div>
                    <div class="ad-content">
                        <div class="menu-hd">
                            <div class="tab-menu">
                                <div class="tab-01 tab-title active">전체</div>
                                <div class="tab-02 tab-title">진행중</div>
                                <div class="tab-03 tab-title">종료</div>
                            </div>
                            <div class="right-menu">
                                <div class="select-box only-pc">
                                    <div id="select_text" class="select-text">
                                    <span class="text-box">캠페인 유형 선택</span>
                                    <i class="ic-arrow-down"></i></div>
                                    <ul class="option-wrap">
                                        <li data-select="all" class="options">ALL</li>
                                        <li data-select="fixed" class="options">고정형</li>
                                        <li data-select="nationwide" class="options">전국형</li>
                                        <li data-select="spot" class="options">스팟</li>
                                    </ul>
                                </div>
                                <button type="button" id="ad_delet_btn" class="ad-delet-btn">삭제</button>
                            </div>
                        </div>

                        <div class="tab-wrap">
                            <div class="list-hd list-flex">
                                <div class="chk-box hd-all-chk">
                                    <input type="checkbox" name="all_chk" id="all_chk" class="all-chk"/>
                                </div>
                                <div class="grid">
                                    <div class="grid-box title-wrap hd-name only-mb">광고 이름</div>
                                    <div class="grid-box type-wrap hd-type">광고 유형</div>
                                    <div class="grid-box title-wrap hd-name only-pc">광고 이름</div>
                                    <div class="grid-box car-wrap hd-car">운행 차량수</div>
                                    <div class="grid-box distance-wrap hd-distance">총 운행거리</div>
                                    <div class="grid-box time-wrap hd-time">총 운행시간</div>
                                </div>
                            </div>
                            
                            {/* <!--전체 리스트--> */}
                            <div class="tab-content all-wrap on">
                                <ul class="list-wrap">
                                    {/* <?php if($ad_list):?>
                                        <?php foreach($ad_list as $list):?>
                                        <li class="list-flex">
                                            <div class="chk-box chk-wrap">
                                                <input type="checkbox" class="list-chk" name="list_chk">
                                            </div>
                                            <a href="<?= $list['url'] ?>" class="grid" target="_blank">
                                                <div class="grid-box title-wrap only-mb"><?= $list['title'] ?></div>
                                                <div class="grid-box type-wrap"><?= $list['type'] ?></div>
                                                <div class="grid-box title-wrap only-pc"><?= $list['title'] ?></div>
                                                <div class="grid-box car-wrap"><?= $list['car'] ?> 대</div>
                                                <div class="grid-box distance-wrap"><?= $list['distance'] ?> km</div>
                                                <div class="grid-box time-wrap"><?= $list['time'] ?> 시간</div>
                                                <i class="only-mb ic-arrow-right"></i>
                                            </a>
                                        </li>
                                        <?php endforeach; ?>
                                    <?php else: ?> <!--list 없을때-->
                                        <div class="none-list">진행중인 광고가 없습니다.</div>
                                    <?php endif; ?> */}
                                </ul>
                            </div>

                            {/* <!--진행중 리스트--> */}
                            <div class="tab-content proceeding-wrap">
                                <ul class="list-wrap">
                                    {/* <?php if($ad_list):?>
                                        <?php foreach($ad_list as $list):?>
                                        <li class="list-flex">
                                            <div class="chk-box chk-wrap">
                                                <input type="checkbox" class="list-chk" name="list_chk">
                                            </div>
                                            <a href="<?= $list['url'] ?>" class="grid" target="_blank">
                                                <div class="grid-box title-wrap only-mb"><?= $list['title'] ?></div>
                                                <div class="grid-box type-wrap"><?= $list['type'] ?></div>
                                                <div class="grid-box title-wrap only-pc"><?= $list['title'] ?></div>
                                                <div class="grid-box car-wrap"><?= $list['car'] ?> 대</div>
                                                <div class="grid-box distance-wrap"><?= $list['distance'] ?> km</div>
                                                <div class="grid-box time-wrap"><?= $list['time'] ?> 시간</div>
                                                <i class="only-mb ic-arrow-right"></i>
                                            </a>
                                        </li>
                                        <?php endforeach; ?>
                                    <?php else: ?> <!--list 없을때-->
                                        <div class="none-list">진행중인 광고가 없습니다.</div>
                                    <?php endif; ?> */}
                                </ul>
                            </div>

                            {/* <!--종료 리스트--> */}
                            <div class="tab-content end-wrap">
                                <ul class="list-wrap">
                                    {/* <?php if($ad_list):?>
                                        <?php foreach($ad_list as $list):?>
                                        <li class="list-flex">
                                            <div class="chk-box chk-wrap">
                                                <input type="checkbox" class="list-chk" name="list_chk">
                                            </div>
                                            <a href="<?= $list['url'] ?>" class="grid" target="_blank">
                                                <div class="grid-box title-wrap only-mb"><?= $list['title'] ?></div>
                                                <div class="grid-box type-wrap"><?= $list['type'] ?></div>
                                                <div class="grid-box title-wrap only-pc"><?= $list['title'] ?></div>
                                                <div class="grid-box car-wrap"><?= $list['car'] ?> 대</div>
                                                <div class="grid-box distance-wrap"><?= $list['distance'] ?> km</div>
                                                <div class="grid-box time-wrap"><?= $list['time'] ?> 시간</div>
                                                <i class="only-mb ic-arrow-right"></i>
                                            </a>
                                        </li>
                                        <?php endforeach; ?>
                                    <?php else: ?> <!--list 없을때-->
                                        <div class="none-list">진행중인 광고가 없습니다.</div>
                                    <?php endif; ?> */}
                                </ul>
                            </div>

                            <div class="pagination-wrap">
                                <button type="button" class="arrow prev"></button>
                                <ul class="num-wrap">
                                    <li class="number active">1</li>
                                    <li class="number">2</li>
                                    <li class="number">3</li>
                                    <li class="number">4</li>
                                    <li class="number">5</li>
                                </ul>
                                <button type="button" class="arrow next" disabled></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}
