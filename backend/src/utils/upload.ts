import { S3Client, PutObjectCommand, DeleteObjectCommand, DeleteObjectRequest } from "@aws-sdk/client-s3";
import AppError from "../errors/app-error.js";

// Credenciais do Cloudflare
const R2_CONFIG = {
    BUCKET_NAME: process.env.R2_BUCKET_NAME,
    SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    PUBLIC_ADDRESS: process.env.R2_PUBLIC_ADDRESS,
};

// Configuração do cliente S3
const s3Client = new S3Client({
    endpoint: `https://${R2_CONFIG.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    region: "auto",
    credentials: {
        accessKeyId: R2_CONFIG.ACCESS_KEY_ID,
        secretAccessKey: R2_CONFIG.SECRET_ACCESS_KEY,
    },
});

// Função para excluir a imagem
export async function deleteImage(fileName: string) {
    const fileNameCut = fileName.split(R2_CONFIG.PUBLIC_ADDRESS + '/');
    const fileNameKey = fileNameCut[fileNameCut.length - 1];

    const deleteParams: DeleteObjectRequest = {
        Bucket: R2_CONFIG.BUCKET_NAME,
        Key: fileNameKey,
    };

    try {
        await s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
        throw new AppError(error.message ?? 'Erro inesperado ao excluir a imagem', error.code ?? 0);
    }
}

// Função para fazer o upload da imagem para o Cloudflare R2
export async function uploadImage(fileContent: Buffer, fileName: string, contentType: string = 'image/jpeg') {
    try {
        const uploadParams = {
            Bucket: R2_CONFIG.BUCKET_NAME,
            Key: fileName,
            Body: fileContent,
            ContentType: contentType,
        };

        // Envia para o client
        await s3Client.send(new PutObjectCommand(uploadParams));

        // Monta a url do arquivo
        const fileUrl = `${R2_CONFIG.PUBLIC_ADDRESS}/${uploadParams.Key}`;
        return fileUrl;
    } catch (error) {
        throw new AppError(error.message ?? 'Erro inesperado ao fazer upload da imagem', error.code ?? 0);
    }
}
