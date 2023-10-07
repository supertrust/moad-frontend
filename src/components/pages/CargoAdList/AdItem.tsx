import { useAssignAdvertismentToCargo } from "@src/apis/cargo";
import { IAdVehicule, ICargoAdvertisement } from "@src/types/cargo";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import Cardbox from '@images/cargo-owner-ad-list/cardbox.jpg';
import Truck from '@images/cargo-owner-ad-list/truck.png';
import { clsx } from "clsx";
import { useRouter } from "next/router";

interface AdItemProps {
    ad: ICargoAdvertisement
}

const ad_type_names = {
    fixed_ad: '고정형 광고',
    national_ad: '전국형 광고',
    spot_ad: '스팟광고',
}

const CargoAdItem = ({ ad }: AdItemProps) => {
    const [selectedVehicle, setSelectedVehicle] = useState<IAdVehicule | undefined>();
    const { mutateAsync: assignAdvertismentToCargo, isLoading } = useAssignAdvertismentToCargo();

    const router = useRouter();

    const handleAssignAdvertisment = async () => {
        selectedVehicle && await assignAdvertismentToCargo({
            advertisement_id: ad.id,
            vehicle_id: selectedVehicle.id,
            type: selectedVehicle.vehicles_type,
            status: "apply"
        }, { 
            onSuccess: () => {
                toast.success("신청 성공")  ;
                router.push('/cargo/dashboard')
            },
            onError:  (message) => {
                toast.error(message == 'CARGO_VEHICLE_NOT_FOUND' ? "이 유형의 차량이 등록되어 있지 않은 경우" :  message )
            }
        })
    }

    return (
        <div className="p-3.5 border rounded-[8px]">
            <div className="mb-2.5">
                <div className="relative">
                    <div className="absolute left-5 top-5">
                        <h6 className="text-white font-normal">{ad.ad_name}</h6>
                        <h4 className="text-white font-medium text-2xl">{ad_type_names[ad.type]}</h4>
                    </div>
                    <Image className="w-full rounded-[6px]" src={Cardbox} alt='cardbox' width={150} height={50} />
                </div>
            </div>
            <h4 className="text-[#373737] mb-2.5 font-medium text-xs">
                {ad.ad_name} -
                <span>{ad_type_names[ad.type]}</span>
            </h4>
            <div className="w-[40px] h-[40px] border rounded-full flex items-center justify-center mb-3">
                <Image src={Truck} alt='adapply-pc' width={30} />
            </div>
            <div className="flex items-center gap-2 mb-24">
                {ad.advertisement_vehicles?.map((vehicle) => (
                    <span 
                        key={vehicle.id}
                        onClick={() => setSelectedVehicle(vehicle)}
                        className={clsx(
                            "bg-[#E1ECFF] text-[#0868FD] flex items-center justify-center p-1 cursor-pointer rounded",
                            selectedVehicle == vehicle && 'bg-primary text-white'
                        )}
                    >
                        {vehicle.vehicle_standard}
                    </span>
                ))}
            </div>
            <div className="flex items-center mb-4">
                <Button
                    type="primary"
                    block size="large"
                    disabled={!selectedVehicle || ad.status == 'apply'}
                    className={"h-[48px] rounded-none w-full bg-[#EFEEF0] text-[#C8C5CB] flex items-center justify-center"}
                    loading={isLoading}
                    onClick={() => { ad.status !== 'apply' && handleAssignAdvertisment() }}
                >
                    {ad.status !== 'apply' ? "광고 선택" : "광고 마감"}
                </Button>
            </div>
        </div>
    )
}

export default CargoAdItem