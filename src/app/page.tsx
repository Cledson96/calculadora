"use client";
import {
  Layout,
  Card,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  DatePicker,
  ConfigProvider,
  message,
  Modal,
} from "antd";
import ptBR from "antd/lib/locale/pt_BR";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");
import { useState } from "react";
const { TextArea } = Input;

export default function Home() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>(null);

  const tipos = [
    { name: "Trabalhista", value: "trabalhista" },
    { name: "Cível", value: "civel" },
    { name: "Penal", value: "penal" },
    { name: "Tributário", value: "tributario" },
    { name: "Administrativo", value: "administrativo" },
    { name: "Empresarial", value: "empresarial" },
    { name: "Família", value: "familia" },
    { name: "Sucessões", value: "sucessoes" },
    { name: "Constitucional", value: "constitucional" },
    { name: "Previdenciário", value: "previdenciario" },
  ];

  const tribunais = [
    {
      name: "TJAC - Tribunal de Justiça do Acre",
      value: "Tribunal de Justiça do Acre",
    },
    {
      name: "TJAL - Tribunal de Justiça de Alagoas",
      value: "Tribunal de Justiça de Alagoas",
    },
    {
      name: "TJAM - Tribunal de Justiça do Amazonas",
      value: "Tribunal de Justiça do Amazonas",
    },
    {
      name: "TJAP - Tribunal de Justiça do Amapá",
      value: "Tribunal de Justiça do Amapá",
    },
    {
      name: "TJBA - Tribunal de Justiça da Bahia",
      value: "Tribunal de Justiça da Bahia",
    },
    {
      name: "TJCE - Tribunal de Justiça do Ceará",
      value: "Tribunal de Justiça do Ceará",
    },
    {
      name: "TJDF - Tribunal de Justiça do Distrito Federal",
      value: "Tribunal de Justiça do Distrito Federal",
    },
    {
      name: "TJES - Tribunal de Justiça do Espírito Santo",
      value: "Tribunal de Justiça do Espírito Santo",
    },
    {
      name: "TJGO - Tribunal de Justiça de Goiás",
      value: "Tribunal de Justiça de Goiás",
    },
    {
      name: "TJMA - Tribunal de Justiça do Maranhão",
      value: "Tribunal de Justiça do Maranhão",
    },
    {
      name: "TJMG - Tribunal de Justiça de Minas Gerais",
      value: "Tribunal de Justiça de Minas Gerais",
    },
    {
      name: "TJMS - Tribunal de Justiça de Mato Grosso do Sul",
      value: "Tribunal de Justiça de Mato Grosso do Sul",
    },
    {
      name: "TJMT - Tribunal de Justiça de Mato Grosso",
      value: "Tribunal de Justiça de Mato Grosso",
    },
    {
      name: "TJPA - Tribunal de Justiça do Pará",
      value: "Tribunal de Justiça do Pará",
    },
    {
      name: "TJPB - Tribunal de Justiça da Paraíba",
      value: "Tribunal de Justiça da Paraíba",
    },
    {
      name: "TJPE - Tribunal de Justiça de Pernambuco",
      value: "Tribunal de Justiça de Pernambuco",
    },
    {
      name: "TJPI - Tribunal de Justiça do Piauí",
      value: "Tribunal de Justiça do Piauí",
    },
    {
      name: "TJPR - Tribunal de Justiça do Paraná",
      value: "Tribunal de Justiça do Paraná",
    },
    {
      name: "TJRJ - Tribunal de Justiça do Rio de Janeiro",
      value: "Tribunal de Justiça do Rio de Janeiro",
    },
    {
      name: "TJRN - Tribunal de Justiça do Rio Grande do Norte",
      value: "Tribunal de Justiça do Rio Grande do Norte",
    },
    {
      name: "TJRO - Tribunal de Justiça de Rondônia",
      value: "Tribunal de Justiça de Rondônia",
    },
    {
      name: "TJRR - Tribunal de Justiça de Roraima",
      value: "Tribunal de Justiça de Roraima",
    },
    {
      name: "TJRS - Tribunal de Justiça do Rio Grande do Sul",
      value: "Tribunal de Justiça do Rio Grande do Sul",
    },
    {
      name: "TJSC - Tribunal de Justiça de Santa Catarina",
      value: "Tribunal de Justiça de Santa Catarina",
    },
    {
      name: "TJSE - Tribunal de Justiça de Sergipe",
      value: "Tribunal de Justiça de Sergipe",
    },
    {
      name: "TJSP - Tribunal de Justiça de São Paulo",
      value: "Tribunal de Justiça de São Paulo",
    },
    {
      name: "TJTO - Tribunal de Justiça de Tocantins",
      value: "Tribunal de Justiça de Tocantins",
    },
    {
      name: "TRF1 - Tribunal Regional Federal da 1ª Região",
      value: "Tribunal Regional Federal da 1ª Região",
    },
    {
      name: "TRF2 - Tribunal Regional Federal da 2ª Região",
      value: "Tribunal Regional Federal da 2ª Região",
    },
    {
      name: "TRF3 - Tribunal Regional Federal da 3ª Região",
      value: "Tribunal Regional Federal da 3ª Região",
    },
    {
      name: "TRF4 - Tribunal Regional Federal da 4ª Região",
      value: "Tribunal Regional Federal da 4ª Região",
    },
    {
      name: "TRF5 - Tribunal Regional Federal da 5ª Região",
      value: "Tribunal Regional Federal da 5ª Região",
    },
  ];

  const fase = [
    { name: "Distribuição", value: "distribuicao" },
    { name: "Citação", value: "citacao" },
    { name: "Resposta do Réu", value: "resposta_reu" },
    { name: "Réplica", value: "replica" },
    { name: "Saneamento", value: "saneamento" },
    { name: "Instrução", value: "instrucao" },
    { name: "Julgamento", value: "julgamento" },
    { name: "Recurso", value: "recurso" },
    { name: "Execução", value: "execucao" },
    { name: "Cumprimento de Sentença", value: "cumprimento_sentenca" },
    { name: "Arquivamento", value: "arquivamento" },
  ];

  const recurso = [
    { name: "Sim", value: "sim" },
    { name: "Não", value: "nao" },
  ];

  const precedentes = [
    { name: "Sim", value: "sim" },
    { name: "Não", value: "nao" },
  ];

  const complexidade = [
    { name: "Alta", value: "alta" },
    { name: "Média", value: "media" },
    { name: "Baixa", value: "baixa" },
  ];

  const consultar = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/robo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Dados recebidos da API:", data);
        setModalData(data.data);
        setModalVisible(true);
        message.success("Dados buscados com sucesso");
      } else {
        console.error("Erro ao buscar dados:", data.message);
        message.error("Erro ao buscar dados.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      message.error("Erro na requisição.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider locale={ptBR}>
      <div className="background">
        <Layout style={{ maxWidth: "800px" }}>
          <Card>
            <div>
              <h1 className=" font-bold text-2xl  text-default">
                Calculadora de previsão de processo
              </h1>
            </div>
            <div className="mt-2 mb-5">
              <h2 className=" font-bold text-lg text-black">
                Preencha o formulário e saiba a estimativa de prazo
              </h2>
            </div>
            <Form form={form} layout="vertical" onFinish={consultar}>
              <Row gutter={16}>
                <Col xs={8} sm={24} md={8}>
                  <Form.Item
                    label="TIPO DE PROCESSO:"
                    name="tipo"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecione o tipo de processo",
                      },
                    ]}
                  >
                    <Select>
                      {tipos.map((item) => (
                        <Select.Option key={item.name} value={item.value}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={8} sm={24} md={8}>
                  <Form.Item
                    label="TRIBUNAIS:"
                    name="tribunais"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecione a comarca",
                      },
                    ]}
                  >
                    <Select>
                      {tribunais.map((item) => (
                        <Select.Option key={item.name} value={item.value}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={8} sm={24} md={8}>
                  <Form.Item
                    label="DATA DISTRIBUIÇÃO:"
                    name="data"
                    rules={[
                      {
                        type: "object" as const,
                        required: true,
                        message: "Por favor, insira uma data válida",
                      },
                    ]}
                  >
                    <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={8} sm={24} md={8}>
                  <Form.Item
                    label="VALOR DA CAUSA:"
                    name="valor"
                    rules={[
                      {
                        type: "string",
                        required: true,
                        message: "Por favor, insira um valor válido",
                      },
                    ]}
                  >
                    <Input type="string" />
                  </Form.Item>
                </Col>
                <Col xs={8} sm={24} md={8}>
                  <Form.Item
                    label="FASE DO PROCESSO:"
                    name="fase"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecione a fase do processo",
                      },
                    ]}
                  >
                    <Select>
                      {fase.map((item) => (
                        <Select.Option key={item.name} value={item.value}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={8} sm={24} md={8}>
                  <Form.Item
                    label="RECURSO:"
                    name="recurso"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecione se há recurso",
                      },
                    ]}
                  >
                    <Select>
                      {recurso.map((item) => (
                        <Select.Option key={item.name} value={item.value}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={12} sm={24} md={12}>
                  <Form.Item
                    label="COMPLEXIDADE:"
                    name="complexidade"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecione a complexidade",
                      },
                    ]}
                  >
                    <Select>
                      {complexidade.map((item) => (
                        <Select.Option key={item.name} value={item.value}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={12} sm={24} md={12}>
                  <Form.Item
                    label="RAZÃO COMPLEXIDADE:"
                    name="razaocomplexidade"
                    rules={[
                      {
                        type: "string",
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={12} sm={24} md={12}>
                  <Form.Item
                    label="EXISTE PRECEDENTES:"
                    name="precedentes"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecione se há precedentes",
                      },
                    ]}
                  >
                    <Select>
                      {precedentes.map((item) => (
                        <Select.Option key={item.name} value={item.value}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={12} sm={24} md={12}>
                  <Form.Item
                    label="RAZÃO PRECEDENTE:"
                    name="razaoprecedente"
                    rules={[
                      {
                        type: "string",
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    label="AÇÕES DO ADVOGADO :"
                    name="acoes"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, descreva as ações do advogado",
                      },
                    ]}
                  >
                    <TextArea />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Button
                  type="primary"
                  disabled={loading}
                  loading={loading}
                  htmlType="submit"
                  style={{ width: "200px" }}
                >
                  Consultar
                </Button>
              </Row>
            </Form>
          </Card>
          <Modal
            title="Resultado da Consulta"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
              <Button key="close" onClick={() => setModalVisible(false)}>
                Fechar
              </Button>,
            ]}
          >
            {modalData && (
              <>
                <p>
                  <strong>Prazo Mínimo:</strong> {modalData.tempo_minimo} meses
                </p>
                <p>
                  <strong>Prazo Máximo:</strong> {modalData.tempo_maximo} meses
                </p>
                <p>
                  <strong>Justificativa:</strong> {modalData.justificativa}
                </p>
                <p>
                  <strong>Observações:</strong> {modalData.observacao}
                </p>
              </>
            )}
          </Modal>
        </Layout>
      </div>
    </ConfigProvider>
  );
}
