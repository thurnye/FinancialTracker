import { useState } from "react";
import {
  Edit,
  MapPin,
  Calendar,
  MessageCircle,
  Flag,
} from "lucide-react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Image,
} from "react-bootstrap";
import { toast } from "sonner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { IUser } from "../types/trade.types";

export function UserProfilePage() {
  const authUser = useAppSelector((state) => state.auth.user);
  const [user, setUser] = useState<IUser | null>(null);
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const isOwnProfile = userId ? userId === authUser?.id : true;




  if (!user)
    return (
      <Container className="py-10 text-center">
        <h3 className="text-gray-600">Loading user profile...</h3>
      </Container>
    );

  return (
    <Container fluid className="bg-white min-h-screen py-10">
      <Container className="max-w-6xl">
        {/* Profile Header */}
        <Card className="shadow-md border-0 mb-8">
          <Card.Body className="p-6 md:p-8">
            <Row className="flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              {/* Avatar */}
              <Col xs="auto" className="text-center relative">
                <div className="inline-block relative">
                  <Image
                    src={user.avatar}
                    roundedCircle
                    width={128}
                    height={128}
                    alt={user.name}
                    className="object-cover border-4 border-gray-100"
                  />
                  <Badge
                    bg="success"
                    className="absolute bottom-0 start-1/2 -translate-x-1/2"
                  >
                    Verified
                  </Badge>
                </div>
              </Col>

              {/* Info */}
              <Col className="text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-[#1B263B] mb-1">
                      {user.name}
                    </h2>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {user.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Member since 2024
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-center md:justify-end gap-3 mt-4 md:mt-0">
                    {isOwnProfile ? (
                      <Button
                        onClick={() => navigate("/settings")}
                        className="bg-[#2ECC71] hover:bg-[#27AE60] border-0 text-white flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" /> Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Link
                          to={`/chat/${user.id}`}
                          className="btn bg-[#2ECC71] hover:bg-[#27AE60] text-white d-flex align-items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Message
                        </Link>
                        <Button
                          variant="outline-danger"
                          onClick={() => {
                            toast.warning("Report submitted");
                            navigate("/report", {
                              state: { type: "user", id: user.id },
                            });
                          }}
                          className="d-flex align-items-center gap-2"
                        >
                          <Flag className="w-4 h-4" /> Report
                        </Button>
                      </>
                    )}
                  </div>
                </div>
               
              </Col>
            </Row>
          </Card.Body>
        </Card>

       
      </Container>
    </Container>
  );
}
