import React, { useState } from 'react';
import {
	rows,
	columns,
	rowData,
} from '@src/sections/statistics-driving/tabelData';
import { DataGrid } from '@src/components/common';
import { styles } from '@src/sections/statistics-driving';
import { DateRangePicker } from 'rsuite';
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';

export default function StatisticsScreen() {
	interface RangeType {
		label: string;
		value: [Date, Date];
	}
	const Ranges: RangeType[] = [
		{
			// Today
			label: '오늘',
			value: [startOfDay(new Date()), endOfDay(new Date())],
		},
		{
			// yesterday
			label: '어제',
			value: [
				startOfDay(addDays(new Date(), -1)),
				endOfDay(addDays(new Date(), -1)),
			],
		},
		{
			// last7Days
			label: '지난 7일',
			value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())],
		},
		{
			// last30Days
			label: '지난 30일',
			value: [startOfDay(subDays(new Date(), 29)), endOfDay(new Date())],
		},
	];
	return (
		<>
			<div
				id={styles.statistics_driving}
				className={styles.statistics_driving_page}>
				<div className={styles.container}>
					<div className={styles.board_content}>
						<div className={styles.statistics_driving_content}>
							<div className={styles.only_pc}>
								<div className={styles.page_link}>
									<a href='/statistics' className={styles.link}>
										통계
									</a>
									<span className={styles.link}>&gt;</span>
									<a href='/statistics-driving' className={styles.link}>
										이카루스 서비스 오픈 출시 기념
									</a>
								</div>
							</div>
							<div className={styles.only_mb}>
								<div className={styles.title_wrap}>
									<div className={styles.title}>운행차량</div>
									<div className={styles.line}></div>
								</div>
							</div>
							<div className={styles.calendar_content}>
								<div className={styles.date_wrap}>
									<button
										type='button'
										className={`${styles.icons} ${styles.ic_arrow_prev}`}></button>
									<button
										type='button'
										id={styles.date_select}
										className={styles.date}>
										<DateRangePicker
											className={styles.text}
											format='yyyy-MM-dd'
											ranges={Ranges}
											locale={{
												sunday: '일',
												monday: '월',
												tuesday: '화',
												wednesday: '수',
												thursday: '목',
												friday: '금',
												saturday: '토',
												ok: '적용',
												today: '오늘',
												yesterday: '어제',
												Last_7_day: '지난 7일',
											}}
											defaultValue={[new Date(), new Date()]}
										/>
									</button>
									<button
										type='button'
										className={`${styles.icons} ${styles.ic_arrow_next}`}></button>
								</div>

								<div className={styles.date_info}>
									보고서는 실시간이 아닙니다. 2023. 03. 28 14:59 기준 ,
									2023.03.28 11: 00 시간까지 업데이트된 지표입니다.
								</div>
							</div>

							<div className={styles.driving_wrap}>
								<div className={styles.hd_wrap}>
									<DataGrid columns={columns} rows={rows} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
