import { useAdminMemberInquiryList } from "@src/apis/admin/member-inquiry";
import { DropdownIcon } from "@src/components/icons/admin/advertisement";
import { formatDate } from "@src/utils/formatter";
import { FilterAndSearchSection, AdListModal } from "./component";
import { Pagination, Select, SelectProps, Table } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { ConfirmModal } from "@src/components/ConfirmModal";
import { useUserBlock } from "@src/apis/user";
import Image from "next/image";
import { toast } from "react-toastify";

const colGeneral = {};

const AdminMemberInquiry = () => {
  const { data: memberInquiryRes, isLoading } = useAdminMemberInquiryList();
  const { mutateAsync: unblockUser } = useUserBlock();
  const memberInquiryList = memberInquiryRes?.data;

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmModel, setConfirmModel] = useState({ open: false, user_id: 0 });

  const handleAcceptModal = async () => {
    const data = {
      id: confirmModel.user_id,
      status: 0,
      reason: null,
    };
    await unblockUser(data, {
      onSuccess: async () => {
        toast.success('해당 회원의 블랙리스트가 해제되었습니다.')
        setConfirmModel({ open: false, user_id: 0 });
      },
      onError: (error) => {
      },
    });
  };
  const [adListModalOpen, setAdListModalOpen] = useState({
    open: false,
    data: [],
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const sumWidth = useCallback(() => {
    return columns.reduce(
      (totalWidth, column) => totalWidth + (column.width || 0),
      0
    );
  }, []);

  const fieldOptions: SelectProps["options"] = [
    {
      value: "1",
      label: "가입일시순",
    },
    {
      value: "2",
      label: "회사명순",
    },
  ];

  const handleFieldChange = (value: string | string[]) => {
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns = useMemo(
    () => [
      {
        title: "No",
        dataIndex: "no",
        width: 45,
        ...colGeneral,
        render: (text, record, index) => {
          return <>{index + 1}</>;
        },
      },
      {
        title: "아이디",
        dataIndex: "employee_email",
        width: 200,
        ...colGeneral,
        render: (text, record, index) => {
          return (
            <Link
              className="underline text-[#1D2025]"
              href={`/admin/member-detail/${record?.user_id}`}
            >
              {text}
            </Link>
          );
        },
      },
      {
        title: "업종",
        dataIndex: "sector",
        width: 180,
        ...colGeneral,
      },
      {
        title: "회사명",
        dataIndex: "company_name",
        width: 185,
        ...colGeneral,
      },
      {
        title: "회사 전화번호",
        dataIndex: "company_phone_number",
        width: 150,
        ...colGeneral,
      },
      {
        title: "담당자",
        dataIndex: "manager",
        width: 150,
        ...colGeneral,
      },
      {
        title: "담당자 직위",
        dataIndex: "contact_position",
        width: 150,
        ...colGeneral,
      },
      {
        title: "담당자 휴대폰번호",
        dataIndex: "contact_person_mobile_number",
        width: 150,
        ...colGeneral,
      },
      {
        title: "담당자 이메일",
        dataIndex: "contact_email",
        width: 200,
        ...colGeneral,
      },
      {
        title: "총 광고건수",
        dataIndex: "total_ad_no",
        width: 120,
        ...colGeneral,
        render: (_, record) => {
          return (
            <span
              className={"underline cursor-point"}
              onClick={() =>
                setAdListModalOpen({
                  open: true,
                  data: record.advertisements || [],
                })
              }
            >
              {record.total_ad_no}건
            </span>
          );
        },
      },
      {
        title: "블랙리스트 및 휴면상태",
        dataIndex: "dormant_state",
        width: 180,
        ...colGeneral,
        render: (text, record, index) => {
          return (
            <div className="cursor-pointer">
              {text == 0 ? (
                <Link
                  className="text-[#1D2025]"
                  href={`/admin/blacklist-member-detail/${record?.user_id}`}
                >
                  정상
                </Link>
              ) : (
                <div
                  onClick={() =>
                    setConfirmModel({ open: true, user_id: record?.user_id })
                  }
                >
                  블랙리스트
                </div>
              )}
            </div>
          );
        },
      },
      {
        title: "가입일시",
        dataIndex: "registration_date",
        width: 176,
        ...colGeneral,
        render: (text, record) => {
          return <>{formatDate(record.registration_date, true, 'YYYY.MM.DD')}</>;
        },
      },
    ],
    []
  );
  const Confirmhtml = () => {
    return (
      <>
        <Image src={"/images/warning.png"} width={40} height={40} alt="warning" className="mb-[16px]"/>
        <p className="text-[24px] font-medium mb-[8px]">선택된 10명을 블랙리스트 해제 하시겠습니까?</p>
        <p className="text-[16px] font-normal">블랙리스트 재등록은 회원조회에서 가능합니다.</p>
      </>
    );
  };
  return (
    <div className={styles["body"]}>
      <AdListModal
        adListModalOpen={adListModalOpen}
        handleAdListModalClose={() =>
          setAdListModalOpen({
            open: false,
            data: [],
          })
        }
      />
      <FilterAndSearchSection />

      <div className={"flex items-center justify-between mt-[64px]"}>
        <div className={"flex items-center space-x-4"}>
          <span className={styles["title"]}>회원목록</span>
          <p className={styles["sub-title"]}>
            전체 <span className={'underline'}>150</span> 명 (검색결과 총 <span  className={'underline'}>0</span> 명)
          </p>
        </div>
        <div className={"flex space-x-1"}>
          <div>
            <Select
              popupClassName={"admin-advertisement-select"}
              size={"large"}
              // placeholder={<span className={styles['dropdown-text']}>가입일시순</span>}
              onChange={handleFieldChange}
              style={{ width: 160 }}
              suffixIcon={
                <div className={"pr-1"}>
                  <DropdownIcon />
                </div>
              }
              options={fieldOptions}
              defaultValue={"1"}
            />
          </div>
          <div className={styles["excel-button"]}>
            <span>엑셀다운로드</span>
          </div>
        </div>
      </div>

      <div>
        <Table
          locale={{
            emptyText: "조회 결과가 없습니다.",
          }}
          pagination={false}
          scroll={{ x: sumWidth() + 50 }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={memberInquiryList}
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
                      textAlign: "center",
                    }}
                  />
                );
              },
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
                      textAlign: "center",
                    }}
                  />
                );
              },
            },
          }}
        />
      </div>

      {memberInquiryList?.length && (
        <div className={"flex justify-center py-[54px]"}>
          <Pagination
            className={"admin-members-inquiry-pagination"}
            defaultCurrent={1}
            total={10}
          />
        </div>
      )}

      <ConfirmModal
        open={confirmModel.open}
        text={Confirmhtml()}
        reject={() => {
          setConfirmModel({ ...confirmModel, open: false });
        }}
        accept={() => handleAcceptModal()}
        className="max-w-[450px] !my-0 !mx-auto"
      />
    </div>
  );
};

export default AdminMemberInquiry;
