import useAuth from "@src/hooks/useAuth";

const ContentComponent = ({ value }) => {

    const { dictionary: { common: { letterList } } } = useAuth();

    return <div>
        {value.content}
        <div className={'pt-2 gap-2 flex flex-col'}>
            {
                value.items?.map((item, index) => (
                    <div key={index}>
                        <div>
                            {index + 1}. {item.title}
                        </div>
                        {
                            item?.content ? <div className={'pl-4'}>
                                {item.content}
                            </div> : <></>
                        }
                        {
                            item?.subItems?.length ? <div className={'pl-4 py-2 flex flex-col gap-1'}>
                                {item?.subItems?.map((subItem, index) => (
                                    <div key={index}>
                                        {letterList[index]}) {subItem.title}
                                    </div>
                                ))}
                            </div> : <></>
                        }

                    </div>
                ))
            }
        </div>
    </div>
}

const useTranslations = () => {

    const { dictionary: { customer_policy: { policyList, privacyList }, common: { letterList } } } = useAuth();

    const policy = [
        {
            title: policyList[0].title,
            content: policyList[0].content
        },
        {
            title: policyList[1].title,
            content: policyList[1].content
        },
        {
            title: policyList[2].title,
            content: policyList[2].content
        },
        {
            title: policyList[3].title,
            content: <ContentComponent value={policyList[3]}/>
        },
        {
            title: policyList[4].title,
            content: <div>
                {policyList[4].content}
                <div className={'pt-2 pl-4'}>
                    {
                        policyList[4].items?.map((item, index) => (
                            <div key={index}>
                                <div>
                                    {item.title}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        },
        {
            title: policyList[5].title,
            content: <div>
                {policyList[5].content}
                <div className={'pt-2 pl-4'}>
                    {
                        policyList[5].items?.map((item, index) => (
                            <div key={index}>
                                <div>
                                    {item.title}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        },
        {
            title: policyList[6].title,
            content: <div>
                {policyList[6].content}
                <div className={'pt-2 pl-4'}>
                    {
                        policyList[6].items?.map((item, index) => (
                            <div key={index}>
                                <div>
                                    {item.title}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        },
        {
            title: policyList[7].title,
            content: <div>
                {policyList[7].content}
                <div className={'pt-2 pl-4'}>
                    {
                        policyList[7].items?.map((item, index) => (
                            <div key={index}>
                                <div>
                                    {item.title}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        },
        {
            title: policyList[8].title,
            content: <div>
                {policyList[8].content}
                <div className={'pt-2 pl-4'}>
                    {
                        policyList[8].items?.map((item, index) => (
                            <div key={index}>
                                <div>
                                    {item.title}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        },
        {
            title: policyList[9].title,
            content: <ContentComponent value={policyList[9]}/>
        },
        {
            title: policyList[10].title,
            content: <div>
                {policyList[10].content}
                <div className={'pt-2 pl-4'}>
                    {
                        policyList[10].items?.map((item, index) => (
                            <div key={index}>
                                <div>
                                    {item.title}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        },
        {
            title: policyList[11].title,
            content: <ContentComponent value={policyList[11]}/>
        },
        {
            title: policyList[12].title,
            content: <ContentComponent value={policyList[12]}/>
        },
        {
            title: policyList[13].title,
            content: <ContentComponent value={policyList[13]}/>
        },
        {
            title: policyList[14].title,
            content: <ContentComponent value={policyList[14]}/>
        },
        {
            title: policyList[15].title,
            content: <ContentComponent value={policyList[15]}/>
        },
        {
            title: policyList[16].title,
            content: <ContentComponent value={policyList[16]}/>
        },
        {
            title: policyList[17].title,
            content: <ContentComponent value={policyList[17]}/>
        },
        {
            title: policyList[18].title,
            content: <ContentComponent value={policyList[18]}/>
        },
        {
            title: policyList[19].title,
            content: <ContentComponent value={policyList[19]}/>
        },
        {
            title: policyList[20].title,
            content: <ContentComponent value={policyList[20]}/>
        },
        {
            title: policyList[21].title,
            content: <ContentComponent value={policyList[21]}/>
        },
        {
            title: policyList[22].title,
            content: <ContentComponent value={policyList[22]}/>
        },
        {
            title: policyList[23].title,
            content: <ContentComponent value={policyList[23]}/>
        },
        {
            title: policyList[24].title,
            content: <ContentComponent value={policyList[24]}/>
        },
        {
            title: policyList[25].title,
            content: <ContentComponent value={policyList[25]}/>
        },
        {
            title: policyList[26].title,
            content: <ContentComponent value={policyList[26]}/>
        },
        {
            title: policyList[27].title,
            content: <ContentComponent value={policyList[27]}/>
        },
        {
            title: policyList[28].title,
            content: <ContentComponent value={policyList[28]}/>
        },
        {
            title: policyList[29].title,
            content: <ContentComponent value={policyList[29]}/>
        },
        {
            title: policyList[30].title,
            content: <ContentComponent value={policyList[30]}/>
        },
        {
            title: policyList[31].title,
            content: <ContentComponent value={policyList[31]}/>
        },
        {
            title: policyList[32].title,
            content: <div>
                {policyList[32].content}
                <div className={'pt-2 gap-2 flex flex-col'}>
                    {
                        policyList[32].items?.slice(0, 1).map((item, index) => (
                            <div key={index}>
                                <div>
                                    {letterList[index]}) {item.title}
                                </div>
                                {
                                    item?.content ? <div className={'pl-4'}>
                                        {item.content}
                                    </div> : <></>
                                }
                                {
                                    item?.subItems?.length ? <div className={'pl-4 py-2 flex flex-col gap-1'}>
                                        {item?.subItems?.map((subItem, index) => (
                                            <div key={index}>
                                                {index + 1}. {subItem.title}
                                            </div>
                                        ))}
                                    </div> : <></>
                                }

                            </div>
                        ))
                    }
                    <div className={'pl-4'}>
                        {
                            policyList[32].items[1].title
                        }
                    </div>
                    <div className={'pl-[30px] flex flex-col'}>
                        <div>
                            {
                                policyList[32].items[1].name
                            }
                        </div>
                        <div>
                            {
                                policyList[32].items[1].position
                            }
                        </div>
                        <div>
                            {
                                policyList[32].items[1].phone
                            }
                        </div>
                        <div>
                            {
                                policyList[32].items[1].email
                            }
                        </div>
                    </div>
                </div>
            </div>
        },
        {
            title: policyList[33].title,
            content: <ContentComponent value={policyList[33]}/>
        },
        {
            title: policyList[34].title,
            content: <ContentComponent value={policyList[34]}/>
        },

    ]

    const privacy = [
        {
            title: privacyList[0].title,
            content: <ContentComponent value={privacyList[0]}/>
        },
        {
            title: privacyList[1].title,
            content: <ContentComponent value={privacyList[1]}/>
        },
        {
            title: privacyList[2].title,
            content: <ContentComponent value={privacyList[2]}/>
        },
        {
            title: privacyList[3].title,
            content: <ContentComponent value={privacyList[3]}/>
        },
        {
            title: privacyList[4].title,
            content: <ContentComponent value={privacyList[4]}/>
        },
        {
            title: privacyList[5].title,
            content: <ContentComponent value={privacyList[5]}/>
        },
        {
            title: privacyList[6].title,
            content: <ContentComponent value={privacyList[6]}/>
        },
        {
            title: privacyList[7].title,
            content: <ContentComponent value={privacyList[7]}/>
        },
        {
            title: privacyList[8].title,
            content: <ContentComponent value={privacyList[8]}/>
        },
        {
            title: privacyList[9].title,
            content: <ContentComponent value={privacyList[9]}/>
        },
        {
            title: privacyList[10].title,
            content: <ContentComponent value={privacyList[10]}/>
        },
        {
            title: privacyList[11].title,
            content: <ContentComponent value={privacyList[11]}/>
        },
        {
            title: privacyList[12].title,
            content: <ContentComponent value={privacyList[12]}/>
        },
        {
            title: privacyList[13].title,
            content: <ContentComponent value={privacyList[13]}/>
        },
        {
            title: privacyList[14].title,
            content: <ContentComponent value={privacyList[14]}/>
        },
        {
            title: privacyList[15].title,
            content: <ContentComponent value={privacyList[15]}/>
        }
    ]


    return {
        policy,
        privacy
    }

};

export default useTranslations;