import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import {DotStatusIcon} from "@src/components/icons/admin/advertisement";
import { AdminAdList } from "@src/types/admin/member-inquiry";
import { formatDate } from "@src/utils/formatter";
import { Select, SelectProps, Table } from "antd";
import clsx from "clsx";
import * as React from "react";
import { useCallback, useMemo } from "react";
import Search from "../../../../../../layout/components/advertisementAdmin/Search/Search";
import DropdownIcon from "../../../../../icons/admin/advertisement/dropdownIcon";
import styles from "./styles.module.scss";
import AdDetail from '../adDetail/adDetail';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const colGeneral = {

}

const AdvertisementStatus = {
    proceeding: "진행중",
    applying: "신청중",
    end: "종료",
};

const Types = {
    fixed_ad: "고정",
    national_ad: "전국",
    spot_ad: "스팟",
};


function AdListModal({adListModalOpen,handleAdListModalClose} : {adListModalOpen : {
    open : boolean,
    data : AdminAdList[]
    }, handleAdListModalClose : ()=>void}) {

    const handleFieldChange = (value: string | string[]) => {

    };

    const [adDetailModalOpen, setAdDetailModalOpen] = React.useState<{open:boolean,data:AdminAdList | null}>({
        open: false,
        data: null,
      });

    const fieldOptions : SelectProps['options'] = [
        {
            value: '1',
            label: '아이디',
        },
        {
            value: '2',
            label: '회사명',
        },
        {
            value: '3',
            label: '회사 전화번호',
        },
        {
            value: '4',
            label: '담당자',
        },
        {
            value: '5',
            label: '담당자 직위',
        },
        {
            value: '6',
            label: '담당자 휴대폰번호',
        },
        {
            value: '7',
            label: '담당자 이메일',
        },
    ];
    const columns = useMemo(() => [
        {
            title: 'No',
            dataIndex: 'no',
            width: 45,
            ...colGeneral,
            render : (text,record,index)=>{
                return <>{index+1}</>
            }

        },
        {
            title: '광고진행상태',
            dataIndex: 'status',
            width: 140,
            ...colGeneral,
            render: (_,record)=>{
                return <div className={'flex justify-center'}>
                    <div className={clsx(styles['status'],record.status=="proceeding" ? "bg-[#ebf0fa]" : "bg-[#ebf8f1]")}>
                        <DotStatusIcon fill={record.status=="proceeding" ? "#5991ff" : "#1cba75"}/>
                        <span className={clsx(record.status=="proceeding" ? "text-[#5991ff]" : "text-[#1cba75]")}>{AdvertisementStatus[record.status]}</span>
                    </div>
                </div>
            }
        },
        {
            title: '광고유형',
            dataIndex: 'type',
            width: 120,
            ...colGeneral,
            render: (_,record)=>{
                return <span>{Types[record.type]}</span>
            }
        },
        {
            title: '광고명',
            dataIndex: 'ad_name',
            width: 235,
            ...colGeneral,
            render:(_,record)=>{
                
                return <div className={'flex'} onClick={() =>
                    setAdDetailModalOpen({
                      open: true,
                      data: record || [],
                    })
                  }><span className={'underline'}>{record.ad_name}</span></div>
            }
        },
        {
            title: '광고시작일',
            dataIndex: 'start_date',
            width: 140,
            ...colGeneral,
            render : (text,record)=>{
                return <>{formatDate(record.start_date)}</>
            }
        },
        {
            title: '광고종료일',
            dataIndex: 'end_date',
            width: 140,
            ...colGeneral,
            render : (text,record)=>{
                return <>{formatDate(record.end_date)}</>
            }
        },
    ], []);

    const sumWidth = useCallback(() => {
        return columns.reduce((totalWidth, column) => totalWidth + (column.width || 0), 0);
    }, []);

    return (
        <div>
            <BootstrapDialog
                onClose={handleAdListModalClose}
                aria-labelledby="customized-dialog-title"
                open={adListModalOpen.open}
                fullWidth={true}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "876px",
                            height: "100%",
                            maxHeight: "690px"
                        },
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 1, textAlign: "center" }} id="customized-dialog-title">
                   <span className={styles['modal-title']}>
                        광고 리스트
                   </span>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleAdListModalClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <div className={'flex flex-col  space-y-5'}>
                        <div className={clsx("flex border items-center")}>
                            <div className={styles['filter-label']}>
                                <span className={styles['filter-key']}>검색</span>
                            </div>
                            <div className={'flex  flex-1 pr-1'}>


                                <div className={'flex-1 flex space-x-1'}>
                                    <Select
                                        popupClassName={"admin-advertisement-select"}
                                        size={"large"}
                                        placeholder={<span className={styles['dropdown-text']}>검색어 선택</span>}
                                        onChange={handleFieldChange}
                                        style={{ width: 200}}
                                        suffixIcon={<div className={'pr-1'}><DropdownIcon/></div>}
                                        options={fieldOptions}
                                    />

                                    <Search className={`flex-1 ${styles['search']}`} inputClass={`flex-1 bg-white ${styles['search-border-color']}`}
                                            iconClass={`bg-white ${styles['search-icon-border-color']}`}/>

                                </div>

                            </div>
                        </div>
                      <div>

                          <Table
                              locale={{
                                  emptyText: '조회 결과가 없습니다.',
                              }}
                              pagination={false} scroll={{ y : 400}}
                              columns={columns} dataSource={adListModalOpen.data}
                              components={{
                                  header: {
                                      cell: ({ style: cellStyle, ...cellProps }: any) => {
                                          return (
                                              <th
                                                  {...cellProps}
                                                  style={{
                                                      ...cellStyle,
                                                      height: "45px",
                                                      color: "#6b7280",
                                                      padding: "0px",
                                                      fontWeight: 500,
                                                      background: "#f8faff",
                                                      textAlign: "center"
                                                  }}
                                              />
                                          );
                                      }
                                  },
                                  body: {

                                      cell: ({ style: cellStyle, ...cellProps }: any) => {
                                          return (
                                              <td
                                                  {...cellProps}
                                                  style={{
                                                      ...cellStyle,
                                                      height: "40px",
                                                      padding: 0,
                                                      textAlign: 'center'
                                                  }}
                                              />
                                          );
                                      }
                                  }
                              }}
                          />

                      </div>
                    </div>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", display: "flex" }}>
                    <div className={styles['confirmation']} onClick={handleAdListModalClose}>
                        <span>
                            확인
                        </span>
                    </div>
                </DialogActions>
            </BootstrapDialog>
            <AdDetail
                adDetailModalOpen={adDetailModalOpen}
                handleAdDetailModalClose={() =>
                    setAdDetailModalOpen({
                    open: false,
                    data: null,
                })
                }
            />
        </div>
    );
}

export default AdListModal;